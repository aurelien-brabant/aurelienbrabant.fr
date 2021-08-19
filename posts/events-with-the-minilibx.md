---
title: "Managing events with the minilibx"
preview: "A clear and comprehensive tutorial about managing events with the minilibx."
date: "2020-02-08"
author: "Aurélien Brabant"
previous: "getting-started-with-the-minilibx"
next: "pixel-drawing-with-the-minilibx"
coverUrl: "https://cdn.wallpapersafari.com/17/17/evKQDc.jpg"
---

## Wanderer, beware!

Hey! If this post is the first you're reading from me about the minilibx, [you'd better check out the first
post](https://aurelienbrabant.fr/posts/getting-started-with-the-minilibx), which explains all the basics you need to know.
That said, let's discuss how we are going to handle events using the minilibx!

# How minilibx handles events

To make use of events, it is really important to understand how the minilibx event system works globally.

Remember about the naive while loop we used last time, when we wanted to keep showing the window on the screen ?
Well, the minilibx offers us the `mlx_loop` function, which basically starts an infinite loop for us,
but inside this loop things happen. And by things, I essentialy mean **events**.

Clicking anywhere in the window with the mouse is an event. Pressing a key is another. Events are basically
everything the user can do to interact with the program. 

To make the program interactive, events are a must have. Before the `mlx_loop` function is called, the minilibx
allows us to **register events** that are able to be triggered after the loop has started. The minilibx calls these
functions **hooks**.

Take a look at the flowchart below. I tried to summarize briefly how the whole thing works by reading
the source code directly.

![](mlx-loop-flowchart.png)

As you can see, it is somewhat simple. Now that you've an understanding of how the event loop works, let's
figure out how to register the events using the minilibx API.

# Registering events with minilibx's hooks

In order for us to register events, the minilibx provides us a set of functions called *hooks* that we'll be able to use
to register events *before* `mlx_loop` is called.

There are five different hook functions we can actually make use of:

```c
int	mlx_mouse_hook (void *win_ptr, int (*funct_ptr)(), void *param);
int	mlx_key_hook (void *win_ptr, int (*funct_ptr)(), void *param);
int	mlx_expose_hook (void *win_ptr, int (*funct_ptr)(), void *param);
int	mlx_loop_hook (void *mlx_ptr, int (*funct_ptr)(), void *param);
int	mlx_hook(void *win_ptr, int x_event, int x_mask, int (*funct)(), void *param);
```
You can see that excepting the last prototype, the parameters are identical. Let's discuss what are these parameters quickly:

- `win_ptr` is the pointer to a window. This window will register for the given event.
- `func_ptr` is a pointer to a function *that returns an int* and that takes *undefined* parameters. Beware, `(*func_ptr)()` is not
the same as `(*func_ptr)(void)`: the last means NO argument while the first means "any set of arguments".
- `param` is the address of an element you would want to access in your *func_ptr* when you'll be handling events. The minilibx doesn't
use `param` whatsoever, that's just a way to help you pass arguments.

## The mlx_mouse, mlx_key, and mlx_expose hooks

These hooks are self explanatory. You can register keyboard and mouse related event, as well as expose events. Expose events are triggered when
the content of a window gets lost (for example, when the minilibx's window is covered partially or entirely by another) and needs to be re-drawn.

Let's take the code we've done in the last post. We're going to add a new feature to it: whenever the escape key is pressed, the window
will disappear and all the memory allocated for the program will be freed correctly. Here is a way to do it using `mlx_key_hook`:

```c
#include <X11/keysym.h>

typedef struct s_data
{
	void	*mlx_ptr;
	void	*win_ptr;
}	t_data;

int	handle_no_event(void *data)
{
	/* This function needs to exist, but it is useless for the moment */
	return (0);
}

int	handle_input(int keysym, t_data *data)
{
	if (keysym == XK_Escape)
		mlx_destroy_window(data->mlx_ptr, data->win_ptr);
	return (0);
}

int	main(void)
{
	t_data	data;

	data.mlx_ptr = mlx_init();
	if (data.mlx_ptr == NULL)
		return (MLX_ERROR);
	data.win_ptr = mlx_new_window(data.mlx_ptr, WINDOW_WIDTH, WINDOW_HEIGHT,
			"My first window!");
	if (data.win_ptr == NULL)
	{
		free(data.win_ptr);
		return (MLX_ERROR);
	}

	/* Setup hooks */ 
	mlx_loop_hook(data.mlx_ptr, &handle_no_event, &data);
	mlx_key_hook(data.win_ptr, &handle_input, &data);

	mlx_loop(data.mlx_ptr);

	/* we will exit the loop if there's no window left, and execute this code */
	mlx_destroy_display(data.mlx_ptr);
	free(data.mlx_ptr);
}
```
Don't feel overwhelmed by this code. There's a lot of things we added here. Let's figure out
what it does.

### Organizing data to pass it to the hook functions

The first big change is the way we are organizing data. We are now using a `t_data` object
to store all the important stuff. This is a structure defined at the very top of our C file.
But why would we want to do that ? 

The answer is related to the way we need to pass arguments to the *hook* functions. We are only able
to pass a single void pointer. Therefore, to pass multiple arguments, we obviously need a structure, in order
to pass a pointer to this structure. That's the reason why we took this approach.

### Hooking into the KeyRelease event using mlx_key_hook

In order for us to get the proper event, we use the `mlx_key_hook` function. The function that will be executed
each time a key is released is `handle_input`. This is the duty of this function to check which key has been released,
and to do things accordingly. We also pass the address of `data` which is the `t_data` object that contains all the stuff
that we need to access inside `handle_input`.

The `handle_input` function checks if the key's symbol corresponds to the escape key. We included the `X11/keysym.h` header in order
to get the values of all the available symbols.

Notice how I keep saying "key symbol" and not "key code". That's because a key code is not the same thing than a key symbol. 
The key code for the "A" key on an AZERTY keyboard layout will be the same than the key code for the "Q" key on a QWERTY layout.
However, what we want to deal with is the symbol. If the key I expect to be pressed is "A", I want it to be "A" whatever
the keyboard layout of the user is. I want to get it by the symbol. This conversion is done by the minilibx (to be exact, Xlib handles it)
internally. What we're getting in `handle_input` is the correct key symbol.

If the symbol check evaluates to true, then that means the escape key has been released, so we destroy the window.
Because the window gets destroyed, the `mlx_loop` ends as there's no window left.

Try it out!

## mlx_loop_hook

There's another hook we used in the previous example, but we didn't take the time to talk about it. 

Well, the `mlx_loop_hook` is one hook that is triggered when there's no event processed. It is especially useful to draw things
continuously on the screen, even if we didn't really need it in our example. The only reason we've used it is because without it,
the loop would have never ended. That's directly related to how the `mlx_loop` is implemented. You can
[look at the implementation](https://github.com/42Paris/minilibx-linux/blob/master/mlx_loop.c) if you're that curious.

## Register ANY X event with mlx_hook

Let's talk about the last one now. Maybe you realized it, but `mlx_key_hook` and `mlx_mouse_hook` are limited. Did you notice
how I kept saying "released" when I was talking about the key hook ? 

I didn't say "pressed", simply because a key *press* and a key *release* are different events. One problem with these basic hooks is that
they only handle one event related to the keyboard and the mouse. For the keyboard, it is the `KeyRelease` event.

Try to run the program and press the escape key **without releasing it**. You'll notice that nothing happens unless you release the key. That's
because we registered to a `KeyRelease` event. However, we need an alternative for other events that the X Window System handles. That's exactly
what the `mlx_hook` is used for.

The `mlx_hook` function takes five arguments. We've already explained what `win_ptr`, `func_ptr` and `param` are, but there are two new
parameters:

- `x_event` is an integer corresponding to the name of the X event. You can find all the event names in the `X11/X.h` header.
- `x_mask` is a bit mask corresponding to the X event. It is used by the minilibx to filter the events received by the window. The list of
all the available masks is also defined in `X11/X.h`.

Let's change the program to add an event handler for the `KeyPress` event:

```c
#include <X11/X.h>

int	handle_keypress(int keysym, t_data *data)
{
	if (keysym == XK_Escape)
		mlx_destroy_window(data->mlx_ptr, data->win_ptr);

	printf("Keypress: %d\n", keysym);
	return (0);
}

int	handle_keyrelease(int keysym, void *data)
{
	printf("Keyrelease: %d\n", keysym);
	return (0);
}

int	main(void)
{
	t_data	data;

	data.mlx_ptr = mlx_init();
	if (data.mlx_ptr == NULL)
		return (MLX_ERROR);
	data.win_ptr = mlx_new_window(data.mlx_ptr, WINDOW_WIDTH, WINDOW_HEIGHT, "My first window!");
	if (data.win_ptr == NULL)
	{
		free(data.win_ptr);
		return (MLX_ERROR);
	}

	/* Setup hooks */ 
	mlx_loop_hook(data.mlx_ptr, &handle_no_event, &data);
	mlx_hook(data.win_ptr, KeyPress, KeyPressMask, &handle_keypress, &data); /* ADDED */
	mlx_hook(data.win_ptr, KeyRelease, KeyReleaseMask, &handle_keyrelease, &data); /* CHANGED */

	mlx_loop(data.mlx_ptr);

	/* we will exit the loop if there's no window left, and execute this code */
	mlx_destroy_display(data.mlx_ptr);
	free(data.mlx_ptr);
}
```

It is needed to add the `X11/X.h` header in order to get the macros releated to the event names/masks.
I decided to replace the `mlx_key_hook` call by another call to the more generic `mlx_hook` because I find
this clearer.

Each hook as its own handler, and this is working perfectly, with no leaks at all! With `mlx_hook`, it is possible
to hook into any event X provides, so feel free to implement cool stuff on your own!

That said, that's it for this post !
In the next post, we're going to tackle the fun part: drawing things on the screen!

You can find the final code [here](https://github.com/aurelien-brabant/minilibx-posts-code).
