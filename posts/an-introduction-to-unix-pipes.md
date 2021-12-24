---
title: "An introduction to UNIX pipes"
description: "Pipes are a way for two ore more processes to communicate data. Let's see how to use them in C!"
releaseTs: "2021-07-23"
coverImagePath: "/some/local/path"
authorEmail: "perso@aurelienbrabant.fr"
tags:
- C Programming
- UNIX
---

Communication between programs is crucial, and is one of the topic any novice
programmer needs to face at some point. On an UNIX system, one easy way of
sharing data is to use pipes.

Pipes are often considered as a difficult topic when tackled by beginners, but
in fact this is probably the easiest way to do inter-process communication on an UNIX based operating system.

This article aims to explain clearly what pipes are and how to use them in C, in a concise and clear way.
First we're going to talk about what pipes are and why they are useful (which problem do they solve?), and we'll
finally implement a really simple C program making use of these.

# Inter process communication

## What is Inter Process Communication (IPC)

In computer science, a *process* is an instance of a program which is executed
by the CPU, making use of several pieces of the computer's hardware.

For example, when you run any command from a terminal, such as, let's say,
`ls`, then a process is created and the code written for the `ls` utility
is executed, inside a process that has a given identifier (PID).

In the case of `ls`, the code is really short, so the process does not have
a really long lifetime, but most processes on your computer are actually
constantly running, performing tasks that are essential to the operating
system.

Sometimes, different processes that are part of a single application (but not necessarily) may want to communicate
informations to each other. However, because the code and memory section of each process is absolutely separated from each other,
this communication can't be achieved naturally. This is the problem of *inter communication* between processes.

## Forms of inter process communication

Fortunately, operating systems provides ways to actually perform IPC without any problem.
Below are some of them:

- sockets
- shared memory
- pipes

These different ways all have their pros and cons, but in this post, we'll
concentrate on pipes which are really handy for doing simple IPC.

# The pipe IPC mechanism

## A quick reminder about file descriptors

When using pipes on an UNIX system, we'll need to manipulate what we refer to as
file descriptors. File descriptors, often abbreviated **fd**, are small integer
values that are **local to a process** and that **refer** to a file or a special device
on the operating system.

As you may know, each time a process is created when running a command from the command line,
three of them are automatically bound to the process:

![](fd_inheritance.webp)

As we said before, file descriptors are local to a process, which means
that each process has its own set of file descriptors. However, it is perfectly
possible and expected that these file descriptors refer to the same underlying
operating system object (which is, in most cases, either a file or the terminal emulator device itself).

### More about default file descriptors

Default file descriptors automatically made available to any program are usually
0 (standard input), 1 (standard output) and 2 (standard error).

Each one of these refer to the terminal emulator object, allowing to interact with it in a special way.
Because they are bound to it, any write operation performed on fd 1 or 2 is going to print output on
the terminal, while any read operation done on fd 0 will ask input to be provided from the terminal.

### File descriptor limit per process

The number of file descriptors a process can open through the `open` system
call is limited to a given number. It is therefore really important to **never
waste any file descriptor** as it is a limited resource on the system.

The number of file descriptor a process can open on an UNIX based operating
system can usually be obtained using the `ulimit -n` command.

```bash
$ ulimit -n
256
```

Note that this number **includes** the three default file descriptors, therefore
a program can generally open `n - 3` file descriptors, where `n` is the result
given by `ulimit -n`.

## Pipes

A pipe is basically an object on the system that has a fixed size and two ends:
a **read end** and a **write end**.

A ordinary pipe is designed to be an unidirectional form of IPC. One process writes into
the pipe's write end, while another process reads from the pipe.

Let's consider this simple C program:

```c
int	main(void)
{
	int childPid = fork();
	if (childPid == 0) {
		char *av[] = {
			"/bin/echo",
			"h_e_l_l_o_ _w_o_r_l_d",
			NULL,
		};
		if (execv(av[0], av) == -1) {
			perror("execv: ");
		}
		exit(1);
	}
	return (0);
}
```
This simple program creates a new child process, and execute the
`/bin/echo 'h_e_l_l_o_ _w_o_r_l_d'` program, by using `execv`. If for any
reason `execv` fails, the error is reported.

Let's say we want to remove every `_` from the output generated by the
`echo` program, but using the `tr -d` command. Using bash or any shell, it would
be as easy as:

```bash
/bin/echo 'h_e_l_l_o_ _w_o_r_l_d' | tr -d '_'
```

Our goal is to reproduce this exact behaviour, but for that we'll need to
use pipes.

## Let's just do it!

At the moment, we already have a working call to the system `echo` program, which
by default outputs on file descriptor 1.

We need to make a call to `tr` now, but we also need to give it the output of the
`echo` command as input to work with.

In order to achieve that, we can use a pipe to make the child process that executes
`echo` output in the pipe, while the master process calls the `tr` command, providing
the read end of the pipe as input.

### Initializing a pipe

First, we need to initialize a pipe. To do that, we must use the `pipe` function
which is declared inside the `unistd.h` header.

```c
int pipe(int pipefd[2]);
```

This function takes an array of 2 integers as a single parameter. If the `pipe` function
succeeds, `pipefd[0]` is a file descriptor refering to the read end of the pipe while `pipefd[1]` refers
to the write end of it.

We need to define the array and call the `pipe` function before the original process gets
forked, because the child process **will have to inherit** the file descriptors refering to
the pipe.

```c
int main(void)
{
	int pipefd[2];

	if (pipe(pipefd) == -1) {
		perror("pipe: ");
		exit(1);
	}
	/* ... */
}
```

If `pipe` returns `-1`, it means that an error occured, so we don't want to continue in that case.
If the call succeeds, 0 is returned and our pipe has been successfully initialized.

### Redirecting echo's output

`echo` outputs on file descriptor 1 by default. That's what we normally expect from
`echo`, but here what we want is to redirect its output directly into the pipe, using
the write end of the pipe stored in `pipefd[1]`.

When a process is forked, the child process is a copy of the process that just called
the `fork` system call. Therefore, the opened file descriptors are inherited, which means
that the child process has also access to the pipe.

In fact, it would be a good idea to make `echo` output in the write end of the pipe instead of the standard output. 
But how can we change the file descriptor echo outputs to? Well, we simply need to make the file descriptor 1
refer to the write end of the pipe instead of the standard output. How can we do that? Using `dup2`!

`dup2` is another function declared in `unistd.h` which's role is to duplicate a file descriptor, but it's doing
it in a particular fashion.

```c
dup2(int fd, int fd2);
```

`dup2` will simply close fd2 (if opened) and **duplicate** `fd`, giving it
the same file descriptor as `fd2`.

Thus the following call:

```c
dup2(2, 1);
```
Will close the fd 1, which refers to the standard output, duplicates the fd 2, which
refers to the standard error, and attribute to the last the file descriptor 1.

After this call to `dup2`, any operation performed on the file descriptor 1 will in fact
be performed on the standard error.

Given this demonstration, we can do exactly the same thing with our situation here.
Before the call to `execv` is made, we can redirect the output of echo using `dup2`.

```c
/* ... */
if (childPid == 0) {
	char *av[] = {
		"/bin/echo",
		"h_e_l_l_o_ _w_o_r_l_d",
		NULL,
	};
	dup2(pipefd[1], 1); /* stdout closed, fd 1 now refers to pipefd[1] in the child process */
	if (execv(av[0], av) == -1) {
		perror("execv: ");
	}
	exit(1);
}
/* ... */
```

We did it! Output generated by the echo command is now going to be redirected
to the write end of the pipe.

The only thing missing now is the call to the `tr` command in the parent process.

### Wiring up the write end of the pipe to the input of the tr command

To call the `tr` command from the parent process, we can use pretty much
similar code than the one in the child process:

```c
if (childPid == 0) { /* ... */ }

char *av[] = {
	"/usr/bin/tr",
	"-d",
	"_",
	NULL,
};

if (execv(av[0], av) == -1) {
	perror("execv: ");
}
```

This code replaces the parent process by the `tr` program, but before calling
`execv` we need to wire up the read end of the pipe to the parent process
input, in order for `tr` to process it.

To do so, we just need to perform the same call to `dup2` that we just did
in the child process, but here what we care about is input.

```c
dup2(pipefd[0], 0);
```
Will close the standard input bound by default to the parent process, duplicate
the file descriptor `pipefd[0]`, giving to the duplicate the file descriptor 0.

Now try to run the entire program, and let's see what happens!

## Let's see if the program works!

Well, if we run the program, here is the output we get:

```bash
$ ./a.out
hello world

```

Amazing, looks like it's working as expected! All the underscores have been
removed by `tr -d` and now the "hello world" string is printed on the standard
output.

However, it looks like the shell does not give the prompt back! It seems that
we're stuck in a kind of "infinite loop" here.

In fact, this is to be expected, as we did not consider one of the most
fundamental property of pipes. Let's see what this is about!

## Pipes life span

One important thing to consider about pipes is their life span:

- As long as a process possesses a file descriptor that refers to the write end of the pipe, the process which
	is reading from the read end will wait for input (i.e will not receive EOF).

- As long as a process possesses a file descriptor that refers to the read end of the pipe, the writer can
	still write into the write end. If all the file descriptors to the read end are closed, then write operations
	become in error and errno should be set to `EPIPE` which is the particular error case for that.

- A pipe is destroyed when no file descriptor refers to it anymore.

### Investigating our code

Given these explanations, we can easily guess what is going on with our
"infinite loop" here. 
`tr` is expecting input from the standard input (here, the read end of our pipe)
until EOF is encountered (i.e a `read` that returns 0) but in the parent process,
we still have an opened file descriptor that refers to the write end of the pipe:
this is `pipefd[1]`, which is never used in the parent process anyway.

Because it is of no use and that we want to stop `tr` from reading from the pipe, we should have
closed `pipefd[1]` after it was passed to the child process.

That way, file descriptor to the write end of the pipe won't exist: the one in the parent
process would've been closed manually and the one in the child process is automatically
closed when the child exits, that is, after `echo` has done its work.

Note that the same observation can be made about the read end of the pipe, and
all file descriptors in general. If not needed in the current process, a file
descriptor should be closed to avoid unexpected behaviour.

Here is the updated code, with the appropriate calls to `close`:

```c
int	main(void)
{
	int pipefd[2];

	pipe(pipefd);

	/* child process, executes echo */
	int childPid = fork();
	if (childPid == 0) {
		 char *av[] = {
			"/bin/echo",
			"h_e_l_l_o_ _w_o_r_l_d",
			NULL,
		};

		close(pipefd[0]); // closing unused read end
		dup2(pipefd[1], 1);
		close(pipefd[1]); // closing original write end, because it has been duplicated

		if (execv(av[0], av) == -1) {
			perror("execv: ");
		}
		exit(0);
	}

	/* parent process, wires up echo's output to tr's input */

	char *av[] = {
		"/usr/bin/tr",
		"-d",
		"_",
		NULL,
	};

	close(pipefd[1]); // closing unused write end
	dup2(pipefd[0], 0);
	close(pipefd[0]); // closing original read end, because it has been duplicated
	if (execv(av[0], av) == -1) {
		perror("execv: ");
	}

	return (0);
}
```

Well done! That's all for this post. I hope that this introduction to pipes
helped and that it will help you making awesome projects!
