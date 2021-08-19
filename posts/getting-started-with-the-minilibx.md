---
title: "Getting started with the minilibx"
preview: "Learn how to begin with the minilibx to render graphics using the X Window System!"
date: "2020-02-07"
author: "Aurélien Brabant"
next: "events-with-the-minilibx"
coverUrl: "https://cdn.wallpapersafari.com/17/17/evKQDc.jpg"
---

The **minilibx** is a small C library used for rendering graphics, primarily used by [42](https://en.wikipedia.org/wiki/42_(school)) students.
As the name implies, this library is built on top of the X Window System API, to provide a much simpler programming interface suited for beginners.
Indeed, no X knowledge is needed at all to render graphics properly using this kind of library.

However, I found that this library is lacking any serious documentation about how to get started with it. That's why I wanted to make posts about this.
In this post as well as the upcoming ones, I'll try to demonstrate how we can use the minilibx in an efficient and comprehensive way. 

This first post will have a small theoric part, to make sure that we understand what is going on under the hood when using this kind of library. The remaining will
all be about building things using code directly (that's what you're expecting, right ?).

**I will focus on the GNU/Linux version of the minilibx here. I will not cover the differences between it and the MacOS version.**

# A small introduction to the X Window System

To understand how things really work, it is needed to understand how graphics usually work in the GNU/Linux world.

Since 1980's, the most popular way of displaying graphics is to use the X11 protocol (X protocol, 11th specification).
To keep things simple, X11 is a network-oriented protocol designed to render graphical elements other than lines of text on the screen.
Several implementations of this protocol exist, but the most popular/used is the **Xorg** one.

For the whole thing to work, two elements are required: **an X server** (in our case the **Xorg** server), and **clients that are able to request things to the X server** (they are basically all the GUI applications you use every day). These applications can **communicate with the server by using a programming interface**:
the most popular one (which the minilibx primarily relies on) is the [Xlib](https://www.x.org/releases/current/doc/libX11/libX11/libX11.html).

The Xlib handles the low level things, and there's a lot of things to understand before we can actually start rendering graphics.
**Fortunately**, more advanced libraries built on top of Xlib have been created, allowing us to focus on the most important: **the app we want to build**.

The **minilibx** is one of them: it is not as featured as libraries like [SDL2](https://www.libsdl.org/download-2.0.php) or [GTK](https://www.gtk.org/),
but it does a good job at abstracting the complicated low level stuff.

## Wayland vs X11

X11 is a really old protocol and it hasn't been updated since a really really long time.
I can freely say that it's far too outdated for 2021. Since 2008, the [Wayland](https://en.wikipedia.org/wiki/Wayland_%28display_server_protocol%29) 
project aims to provide a simpler and better way of doing graphics on GNU/Linux. To be clear, Wayland is not **that** used for the moment,
but it could become the reference in the years to come. **The minilibx is using the X11 protocol under the hood**, and Wayland has nothing
to do with it: just be aware that there's a serious alternative growing up.

**PS**: if you're running a modern version of the [Gnome desktop environement](https://www.gnome.org/), you're likely running on Wayland.

![Wayland (left) VS X Window System (right)](x11-vs-wayland.jpg)

# Hands on the minilibx: basic setup

## Installation:

I'm not going to describe the installation process here, as it is already explained in the [official repository](https://github.com/42Paris/minilibx-linux)'s README.
I'll assume that the minilibx and its header file are installed system-wide. To ensure everything is setuped correctly, you can compile the code below:
```c
#include <stdlib.h>
#include <mlx.h>

int main(void)
{
	void	*mlx_ptr;

	mlx_ptr = mlx_init();
	mlx_destroy_display(mlx_ptr);
	free(mlx_ptr);
}
```
Compile with `clang main.c -lX11 -lXext -lmlx`. If no error occurs, you're good to go!

## The core of a minilibx program: initialization and destruction

**Please refer to the code snippet above for this section.**

### Initializing the minilibx

When using the minilibx, you need to initialize a bunch of stuff before you can actually start to render things. The library ships with
a single function that precisely does this job: `mlx_init`. Under the hood, this function creates a structure that contains all the stuff
the minilibx will need in order to do its things.

Let's look at the prototype of `mlx_init`:

```c
void	*mlx_init();
```

That's a really simple function, but there is something interesting here. What the `mlx_init` function actually returns is a **void pointer**.
If you're not familiar with it, a void pointer is basically an address, but the compiler doesn't know what type this address is pointing to. That's the easiest
way to build a kind of "generic" in C.

In reality, the minilibx returns the address of a `t_xvar` element, which is the big structure containing all the useful stuff I was talking about earlier.
The minilibx developers decided to hide the type from us, so that we can't access the members of the structure easily. That's because we're not supposed
to. The minilibx "public" header `mlx.h` doesn't have any additional type declaration. All that stuff is done in the internals of the library. That's called
**encapsulation** (even if this is more an oriented object programming word).

Hopefully you can now understand what magic is done under the hood, because it can be really confusing to just manipulate a void pointer without knowing what it
refers to (generally).

### Destroying and freeing the ressources

Once we have finished with our program, we'll want to free all the ressources allocated for it. At this point, you can simply call the
`free` function and pass it your `mlx_ptr`. However, if we run a memory error detector program such as `valgrind`, we'll see that there's some
leaks. That's because the display hasn't been closed. But what's the display ?

One of the most important things `mlx_init` initializes is the **display**. In X Programming, the display basically refers to the connexion
identifier used to communicate with the X Server. We won't dive to deep into details here, but just be aware that this is another big structure
managed under the hood for you. What is important to know however, is that this display needs to be closed at some point. The minilibx now has
a really basic function to allow you to do that without using the Xlib API. 

That's the `mlx_destroy_display` function. We need to call it before the `free` function because we need access the `mlx_ptr` to retrieve the display variable.
Now, we shouldn't have any leaks anymore.

## Creating our first window

Now it is time to create our first window. For that, let's use the `mlx_new_window` function. Here's the prototype:

```c
void	*mlx_new_window(void *mlx_ptr,int size_x,int size_y,char *title);
```
Again, here's a really simple function to use! We only need to specifiy the minilibx connexion identifier you've got from `mlx_init`, the width, the height,
and the name of the window. Let's put all the pieces together and make our very first window raise:

```c
#include <stdlib.h>
#include <mlx.h>

# define WINDOW_WIDTH 600
# define WINDOW_HEIGHT 300

int main(void)
{
	void	*mlx_ptr;
	void	*win_ptr;

	mlx_ptr = mlx_init();
	win_ptr = mlx_new_window(mlx_ptr, WINDOW_WIDTH, WINDOW_HEIGHT, "My first window!");
	mlx_destroy_window(mlx_ptr, win_ptr);
	mlx_destroy_display(mlx_ptr);
	free(mlx_ptr);
}
```

In the code above, we defined the window width and the window height as symbolic constants to make it clearer.
We then called the `mlx_new_window`, passing it all the required parameters, to get our new window.

The call to `mlx_destroy_window` is responsive for freeing all the ressources that have been allocated for the window when it is no longer needed.

However, if we try to run that code, a black window will pop up and disappear really quickly. That's because
our program is executing the "destruction" instructions right after the window is created. We need to maintain a
loop to ensure that our window will still be displayed on the screen.

The naive approach would be to add the following right after the call to `mlx_new_window`:

```c
while (1)
	;
```

This statement is basically saying: "loop while it's true". The thing is that it's always true, therefore this is an infinite loop!

We can try to run the code now. The window should appear and stay on the screen. We should be able to move it around without any issue.

![](https://i.imgur.com/ytNGZR7.png)

Don't mind the pink borders, they are automatically added by my window manager!

## Minilibx window limitations

By looking at the minilibx implementation, it seems that there are some limitations related to window creation:

For example, it seems that it is currently [impossible to resize a window](https://github.com/42Paris/minilibx-linux/blob/master/mlx_int_anti_resize_win.c):
thus we're only allowed to deal with the original dimensions of the window. This is not a problem as we don't need this feature for most 42 projects,
but if you were wondering if it is possible or not, **apparently** it's not.

## Drawbacks of our approach

We created a window which is displaying and staying on the screen. Awesome!

However, there are two major drawbacks to the approach we took here:

### Checking for errors

The minilibx's functions we used to initialize and create windows are error-prone, and we didn't check for that potential errors. If by any chance, an error
occurs, our program is likely going to crash. 
Fortunately, the fix here is pretty easy. We know from the minilibx man pages that if an error occurs in `mlx_init` or `mlx_new_window`, the returned
pointer will be `NULL`. Therefore the only thing to do here is to check the return value and adapt the program's control flow accordingly:

```c
#define MLX_ERROR 1

int main(void)
{
	void	*mlx_ptr;
	void	*win_ptr;

	mlx_ptr = mlx_init();
	if (mlx_ptr == NULL)
		return (MLX_ERROR);
	win_ptr = mlx_new_window(mlx_ptr, WINDOW_WIDTH, WINDOW_HEIGHT, "My first window!");
	if (win_ptr == NULL)
	{
		free(win_ptr);
		return (MLX_ERROR);
	}
	while (1)
		;
	mlx_destroy_window(mlx_ptr, win_ptr);
	mlx_destroy_display(mlx_ptr);
	free(mlx_ptr);
}
```

This adds verbosity to the code, but being verbose is always better than being careless...

### Closing the window 

As you may have noticed, it is currently impossible to close the window. And that's simply because we didn't setup any event handling responsible
for closing the window. If you're stuck, you can kill the process using the `Ctrl-C` keys.

This is really bad, because force-killing the process like that will not run the code which is after the infinite loop. It will therefore
result in memory leaks.

We then need to figure out a way to run our program continuously until a particular event happens.

The minilibx offers a solution to that problem, using the `mlx_loop` and `mlx_*hook` functions. 
This is another big topic we'll talk about in the next post, so stay tuned and I hope you liked this introduction helped!

You can find the final code [here](https://github.com/aurelien-brabant/minilibx-posts-code).
