---
title: "Pixel drawing with the minilibx"
description: "All you need to know about drawing pixels using the minilibx."
releaseTs: "2021-02-08"
authorEmail: "perso@aurelienbrabant.fr"
coverImagePath: "/some/local/path"
tags:
- minilibx
- C Programming
- Computer graphics
---

# Wanderer, beware!

Hey! If this post is the first you're reading from me about the minilibx, [you'd better check out the first
post](https://aurelienbrabant.fr/blog/getting-started-with-the-minilibx), which explains all the basics you need to know.
That said, let's discuss how we are going to handle events using the minilibx!

# Screen metrics

Before we actually start, I'd want to make sure we are all on the same page.

A computer screen is basically a 2D object that has `x` and `y` coordinates. By convention, it is considered that the top left corner
of the screen is the origin (x = 0, y = 0).

Let's consider a common screen resolution, that is **1920x1080**.

In this case, that means that there's 1080 rows of pixels on the screen, and that each row has 1920 pixels. The y axis is used to represent
the row number, while the x axis is used to represent the column number.

As an exemple, let's say we want to draw a line that has the following endpoints: P1(0, 100) and P2(1920, 100).

The following is what is going to be rendered on the window:

![](line-drawing.webp)

What we get is an horizontal line taking all the width of the screen (we went from x=0 to x=1920), with a top margin of 100 pixels (the two points have
the same y coordinate, 100, therefore the line is drawn on the 100th row).

Now that we've the basics in mind, let's move on!

# Drawing pixels on the window using mlx_pixel_put

Drawing pixels is the most basic thing a graphical library is used for, and the minilibx provides us simple ways
of doing that. 

The straightforward way is to use the `mlx_pixel_put` function. Let's take a look to the prototype:

```c
int	mlx_pixel_put(void *mlx_ptr, void *win_ptr, int x, int y, int color);
```

We've already explained what `mlx_ptr` and `win_ptr` are, and the others parameters are self-explanatory. `x` and `y` are the coordinate
of the pixel, according to the metric considerations we just discussed. 

Finally, we need to tell the minilibx what is going to be the color of the pixel at this coordinates. But how are we going to represent a color ?

## Encoding a color, according to the True Color standard

![](colors.webp)

Several ways of representing colors for computer graphics exist. The minilibx is complying to the **true color** standard.
Here's the definition of what the true color standard is, according to [techopedia](https://www.techopedia.com/definition/496/true-color):

> True color is an RGB color model standard that specifies 256 shades for red, green and blue spaces, totaling 16 million colors, much more than what the human eye can distinguish, which is only 10 million colors. This allows for very complex graphics and images, hence the name.

With the minilibx, we need to make the color fit into an `int` datatype. That means that we need the `int` datatype to be 32 bits on our system.

We need to encode our color into an `int` by setting the three least significant bits to the amount of red, green and blue, respectively.
We can encode our `int` using two different ways:

### Settings the bits directly

We can simply set the bits of the integer directly, using the `<<` (left shift) as shown in the function below:

```c
int	encode_rgb(uint8_t red, uint8_t green, uint8_t blue)
{
	return (red << 16 | green << 8 | blue);
}
```

This code will simply encode the red, green, and blue values into the returned integer.

### Using the hexadecimal notation

Hexadecimal is widely used when using encoded values because it allows us to clearly distiguish the bytes that form
an integer. To do so, we need to think about an hexadecimal number as groups of two digits. One group of two digits
represents an entire byte.

Be aware tho, that in hexadecimal we have a total of sixteen digits used to represent a number `(0123456789 ((abcdef) || (ABCDEF)))`.

For example, let's say we're assigning the value `0x00FF00FF` to an integer. Just by looking at the number, we can tell that red is FF (255), green is 0
and blue is FF (255). Pretty easy to figure out isn't it ?

However, this solution is interesting **only if we already know what color we want to use at compile time**. If the color is somehow provided by the user or
from any external source, we will need to use the `encode_rgb` function.

## Let's put the pixel !

Now that we know how to use the `mlx_pixel_put`, let's put our first pixel on the window!

```c
#include <stdlib.h>
#include <stdio.h>

#include <X11/X.h>
#include <X11/keysym.h>
#include <mlx.h>

#define WINDOW_WIDTH 600
#define WINDOW_HEIGHT 300

#define MLX_ERROR 1

#define RED_PIXEL 0xFF0000

typedef struct s_data
{
	void	*mlx_ptr;
	void	*win_ptr;
}	t_data;

int	handle_keypress(int keysym, t_data *data)
{
	if (keysym == XK_Escape)
	{
		mlx_destroy_window(data->mlx_ptr, data->win_ptr);
		data->win_ptr = NULL;
	}
	return (0);
}

int	render(t_data *data)
{
	/* if window has been destroyed, we don't want to put the pixel ! */
	if (data->win_ptr != NULL)
		mlx_pixel_put(data->mlx_ptr, data->win_ptr, 
			WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, RED_PIXEL);
	return (0);
}

int	main(void)
{
	t_data	data;

	data.mlx_ptr = mlx_init();
	if (data.mlx_ptr == NULL)
		return (MLX_ERROR);
	data.win_ptr = mlx_new_window(data.mlx_ptr, WINDOW_WIDTH, WINDOW_HEIGHT,
								"my window");
	if (data.win_ptr == NULL)
	{
		free(data.win_ptr);
		return (MLX_ERROR);
	}

	/* Setup hooks */ 
	mlx_loop_hook(data.mlx_ptr, &render, &data);
	mlx_hook(data.win_ptr, KeyPress, KeyPressMask, &handle_keypress, &data);

	mlx_loop(data.mlx_ptr);

	/* we will exit the loop if there's no window left, and execute this code */
	mlx_destroy_display(data.mlx_ptr);
	free(data.mlx_ptr);
}
```

Here, we're making use of the `render` function, the address of which is passed to the `mlx_loop_hook` function. In the previous
post, we called this function `handle_no_event`, because it is triggered continuously while the loop is running.
Because the `render` function's code needs to be run at each frame, we can use it to render all the things we want to display
on the screen!

Notice the call to `mlx_pixel_put`. We passed it two coordinates, that are the half of the window's width and height
respectively, which gives us the center of the window. The color is specified in the hexadecimal format, as a macro called
`RED_PIXEL`.

Try to run this code. You should notice a small red pixel on the center of the window. That's it, here is our first pixel!

![](pixel-put.webp)

### A small check to be safe

Please notice the `if` statement added before the `mlx_pixel_put` function. This statement is here to ensure the window still exists,
to avoid puting a pixel on a window that is no longer available. Because of how `mlx_loop` is implemented, this is what would have
happened if we didn't add this check. Moreover, we needed to ensure that our `win_ptr` was set to `NULL` after the call to `mlx_destroy_window`
to make this check actually work.

## Let's draw a rectangle !

Now that we know how to put a pixel on the screen, implementing a function that'll put a rectangle
instead is pretty straightforward. Rectangles are really useful, and it is very likely that we're
going to use them really much.

Here's one implementation we can use:

```c
#define GREEN_PIXEL 0xFF00

typedef struct s_rect
{
	int	x;
	int	y;
	int width;
	int height;
	int color;
}	t_rect;

/* The x and y coordinates of the rect corresponds to its upper left corner. */

int render_rect(t_data *data, t_rect rect)
{
	int	i;
	int j;

	if (data->win_ptr == NULL)
		return (1);
	i = rect.y;
	while (i < rect.y + rect.height)
	{
		j = rect.x;
		while (j < rect.x + rect.width)
			mlx_pixel_put(data->mlx_ptr, data->win_ptr, j++, i, rect.color);
		++i;
	}
	return (0);
}
```

We will not discuss the mathematics used here, as it is really basic. For each row we
need to draw, we are filling the appropriated number of pixels depending on the rectangle's width.

Note that there's no check performed on the rectangle's member variables. One can implement some checks
to ensure the values are correct, but I think that's not necessary here.

In order for us to render the rectangles, we need to modify the `render` function:

```c
int	render(t_data *data)
{
	render_rect(data, (t_rect){WINDOW_WIDTH - 100, WINDOW_HEIGHT - 100,
			100, 100, GREEN_PIXEL});
	render_rect(data, (t_rect){0, 0, 100, 100, RED_PIXEL});

	return (0);
}
```
In case you're wondering, `(t_rect){}` is what is called a *compound literal*. Since C99, this is a way
to initialize structures without having to manually assign each member. I'm directly passing a structure
by value here.

These `render_rect` function calls will display two rectangles: one in the upper left corner of the window (red), and the other
in the bottom right corner (green).

![](rectangles.webp)

## Drawbacks of our approach

Were you thinking it would be that easy ? 

In this section, I'm going to explain why the approach of using the `mlx_pixel_put` is bad.
I know, I know, that's not really nice. I just teached you something and now I'm saying it's useless!
Trust me, what we learned together is far from being pointless. In fact, thanks to that we'll find what the problem is.

At the moment, there's no problem when we're rendering our rectanges on the screen. Well, there's a problem, but we can't
really see it in a simple configuration like that.

### Let's find out what the problem is

To visualize what is wrong, let's implement a `render_background` function that will change the background color of
the window:

```c
void	render_background(t_data *data, int color)
{
	int	i;
	int	j;

	if (data->win_ptr == NULL)
		return ;
	i = 0;
	while (i < WINDOW_HEIGHT)
	{
		j = 0;
		while (j < WINDOW_WIDTH)
			mlx_pixel_put(data->mlx_ptr, data->win_ptr, j++, i, color);
		++i;
	}
}
```

This function will set all the pixels of the window to the same color.

Now let's add it to our `render` function.

```c
int	render(t_data *data)
{
	render_background(data, WHITE_PIXEL);
	render_rect(data, (t_rect){WINDOW_WIDTH - 100, WINDOW_HEIGHT - 100, 100, 100, GREEN_PIXEL});
	render_rect(data, (t_rect){0, 0, 100, 100, RED_PIXEL});

	return (0);
}
```

Be careful to render the background before the rectangles so that they're not overriden by the background's pixels.

Anyway, let's see what we're getting:

![](flickering-rectangles.gif)

Uh. What an ugly flickering we have now. 

Okay. Well, the issue we have here is pretty simple.

The `mlx_pixel_put` function basically draws the pixel on the window directly, and the person who's looking at the window
will see the change instantly. That's bad here because what we actually want to do is waiting for the whole background to be drawn,
as well as the rectangles, and *then* push that on the window. Because everything is done without any delay, this is giving us this
dirty flickering effect. 

Furthermore, note that this technique is slow. Maybe it is not noticable on your machine, but that's really slow, trust me.

Therefore, we need a solution to these two problems. Well, don't worry, the minilibx provides us a solution. That's a little bit more complicated
than pushing a simple pixel on the window, but that's worth it!

# Using minilibx images to draw on the screen

One of the prefered way of drawing things on a window is to use images. The goal is to create an image
(which is nothing else than a collection of pixels) and edit its pixels directly. When it is done, we will push
that image on the window and we should have our graphics properly rendered without any flickering issue.

Well, images is a big and complex topic, so we won't dive into too much details about how it is implemented by the minilibx. 

However, it is interesting to notice that the minilibx is making use of the Xshm extension, which allows our program to share images
with the X Server through shared memory (`/dev/shm`) and not through the socket like it is the case when using any `Xlib` routine.

Remember how we were continously calling `mlx_pixel_put` to put our pixels on the window. With images shared in memory, we'll be able to
change the pixels directly, using a pointer. To be clear, this is way faster, and that's why we want to use it!

Hopefully, the minilibx provides us a really simple way of dealing with images.

## Creating an image

The first step is obviously to tell the minilibx we want to create a new image. For that, we need to call `mlx_new_image`:

```c
void	*mlx_new_image(void *mlx_ptr,int width,int height);
```

Well, I think there's nothing really complicated with that prototype. We're going to use the dimensions of the window for
our image, because the image is supposed to hold the window's pixels.

The first thing we need to do is to create a `t_img` type that will hold all the stuff we need to work
with an mlx image.

```c
typedef struct s_img
{
	void	*mlx_img;
	char	*addr;
	int		bpp; /* bits per pixel */
	int		line_len;
	int		endian;
}	t_img;
```

The `mlx_img` member refers to the address `mlx_new_image` returns.
The remaining members are needed, we're going to look at it in a minute. For now, let's create our image.
In order to do that, we need to have a place to store it.

This is how our `t_data` object looks like now:

```c
typedef struct s_data
{
	void	*mlx_ptr;
	void	*win_ptr;
	t_img	img;
}	t_data;
```

Let's actually create the image:

```c
data.img.mlx_img = mlx_new_image(data.mlx_ptr, WINDOW_WIDTH, WINDOW_HEIGHT);
```
Now that we've the image, we need to get a bunch of informations about it in order
to make the whole thing work.

We'll especially need the address of the image in the shared memory, so that we are
able to change the pixels of it directly. We'll also need additional informations
to help us with some calculations (`bpp`, `line_len` and `endian` member variables).

To get these informations the minilibx way, we can use the `mlx_get_data_addr` function.

```c
char	*mlx_get_data_addr(void *img_ptr, int *bits_per_pixel, int *size_line, int *endian);
```
We need to pass it the img we've got from `mlx_new_image`. For the three last arguments,
we simply need to pass the address of an `int` variable. The function will set these
integers to the correct value. You can see that as a way to "return" multiple values.

Talking about return value, the `mlx_get_data_addr` function returns the actual address of
the image as a simple array of pixels. We're getting a pointer on `char`, which usually means
we're going to naviguate in the array one byte at a time (not one pixel at a time, a pixel usually
takes more than one byte as we've seen before).

## Accessing one particular pixel of the image

Well, here is the most "complicated" part. To be honest, what is complicated here is to understand
what is done, not really the code itself.

We need to retrieve a pixel at some x and y coordinates, but we don't have a two dimensional array here: we're dealing
with a one dimensional array. Also remember that we're dealing with bytes here, but one pixel takes more than
one byte because we're using the true colors standard. This amount is given by the `bpp` (in bits) value we've got from
`mlx_get_data_addr`.

However, we don't really know how many bytes an `int` is, so we can't really perform a cast on the pointer safely.

### Finding the pixel's first byte's address 

For this example, let's assume we want to get the pixel at coordinates (5, 10). What we want is the **5th** pixel of the **10th row**.
Window/image dimensions are 600x300.

To begin with, let's find the correct row. The previous `mlx_get_data_addr` call provided us the `line_len` value, which is basically
the **amount of bytes taken by one row of our image**. It is equivalent to `image_width * (bpp / 8)`. 

In our case, an `int` is four bytes, so it is `600 * 4 = 2400`. Therefore we can say that the first row begins at the index `0`,
the second one at the index `2400`, the third one at the index `4800`, and so on. Thus we can find the correct row index by doing
`2400 * 10`.

To find the correct column, we will need to move in the row by the given number of pixels. In our case, we want to move
5 pixels "right". To do that, we need to multiply `5` by the number of bytes a pixel actually takes (here `4`). Thus we will
do `5 * 4 = 20`.

If we summarize, we can find the correct index with the following computation: `index = 2400 * 10 + 5 * 4`.

That's it! We just need to generalize the formula using the values `mlx_get_data_addr` provided us. The following
formula is the one we'll use:

```
index = line_len * y + x * (bpp / 8)
```

Now that we have the formula, let's implement the `img_pix_put` function that will put a pixel at (x, y) coordinates of
the image. It will act as a replacement for the `mlx_pixel_put` function.

```c
void	img_pix_put(t_img *img, int x, int y, int color)
{
	char    *pixel;

    pixel = img->addr + (y * img->line_len + x * (img->bpp / 8));
	*(int *)pixel = color;
}
```

That should work, but we've a problem here. If our bytes per pixel value is not equal to
the size of an `int` on our system, we're not doing well. In most scenarios, they will be equal,
and the above implementation will just work, but that's not really the most portable thing in the world.

I've came with what is (in my opinion) a more accurate way of doing it, taking the endianness in account.

### (Optional) Alternative implementation of img_pix_put

```c
void	img_pix_put(t_img *img, int x, int y, int color)
{
	char    *pixel;
	int		i;

	i = img->bpp - 8;
    pixel = img->addr + (y * img->line_len + x * (img->bpp / 8));
	while (i >= 0)
	{
		/* big endian, MSB is the leftmost bit */
		if (img->endian != 0)
			*pixel++ = (color >> i) & 0xFF;
		/* little endian, LSB is the leftmost bit */
		else
			*pixel++ = (color >> (img->bpp - 8 - i)) & 0xFF;
		i -= 8;
	}
}
```

In this implementation each byte is set manually in a different way, depending on the endianness. If you
don't know what the endianness is, I recommend you read [that](https://www.freecodecamp.org/news/what-is-endianness-big-endian-vs-little-endian/).

Moreover, in this implementation, only the number of bytes specified by `bpp` is set. I'm not going to explain the bitwise operations in details, as
this is out of the scope of this post. However, I think and hope showing you this alternative was interesting.

## Let's draw on the screen

### Drawing functions refactoring

What we need to do now is to change every drawing function to make it use the `t_img` object instead of the window directly.

Let's refactor the `render_rect` function:

```c
int render_rect(t_img *img, t_rect rect)
{
	int	i;
	int j;

	i = rect.y;
	while (i < rect.y + rect.height)
	{
		j = rect.x;
		while (j < rect.x + rect.width)
			img_pix_put(img, j++, i, rect.color);
		++i;
	}
	return (0);
}
```

As well as `render_background`:

```c
void	render_background(t_img *img, int color)
{
	int	i;
	int	j;

	i = 0;
	while (i < WINDOW_HEIGHT)
	{
		j = 0;
		while (j < WINDOW_WIDTH)
		{
			img_pix_put(img, j++, i, color);
		}
		++i;
	}
}
```

As you can see, the refactor is pretty easy to do, nothing complicated here.

### Changing the render function

The most important change we need to do is in the `render` function:

```c
int	render(t_data *data)
{
	if (data->win_ptr == NULL)
		return (1);
	render_background(&data->img, WHITE_PIXEL);
	render_rect(&data->img, (t_rect){WINDOW_WIDTH - 100, WINDOW_HEIGHT - 100,
		100, 100, GREEN_PIXEL});
	render_rect(&data->img, (t_rect){0, 0, 500, 300, RED_PIXEL});

	mlx_put_image_to_window(data->mlx_ptr, data->win_ptr, data->img.mlx_img, 0, 0);

	return (0);
}
```

Now we're performing all our drawing operations on our image instead of directly pushing the pixels
on the screen.

We then need to push the updated image on the window, which is done using `mlx_put_image_to_window`. Coordinates
of the image are (0, 0) because it is covering the whole window. The `mlx_put_image_to_window` will push the image
as well as the changes done to it (if any) at each frame.

![](final-rectangles.webp)

See what we have now ? Awesome!

# Congratulations

If you are reading this, congratulations! It was a really long post, but I found necessary to explain
how the things really work.

Now you're mastering the basics of the minilibx, you can do almost what you want with it without compromising efficiency!

You can find the final code [here](https://github.com/aurelien-brabant/minilibx-posts-code).
