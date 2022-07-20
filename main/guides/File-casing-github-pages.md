# Github Pages Case Sensitivity

This guide describes best practices for file casing and what to do if you push up code with casing issues.

## Issue

Github Pages and many other deployment/hosting services are case sensitive. So if you have an upper case letter in a file name but link/import it with a lower case letter, it can break your image/file link.

Example of casing issue, the image referenced in src is <br>`img/screenshot2.PNG` while the Folder/file says<br> `img/Screenshot2.png`.

```html
<img src="img/screenshot2.PNG" class="img-responsive" alt=""> </div>
```

Folder/file structure (**img** is a folder)

```
img
   -Screenshot2.png
index.html
```

[Full example on StackOverFlow](https://stackoverflow.com/questions/41468951/images-not-displaying-in-github-pages)

## Best Practices

Generally it is best to make everything lowercase. ([there are exceptions here](https://google.github.io/styleguide/jsguide.html#naming-rules-by-identifier-type), TL;DR Class names, Enum names, Template parameters). <br> No spaces is also best practice. Replace spaces with a - or \_.

| Good            | Bad             |
| --------------- | --------------- |
| my-favorite-pic | My Favorite Pic |
| my_favorite_pic | My_Favorite_Pic |

Check out the [common programming casings](https://chaseadams.io/posts/most-common-programming-case-types).

## Solution

Here's the example for working through the basic solution.

1. First, you need to do **all** the physical renaming. Go through your files and folders and fix all the casing to be lower case.<br> **Example**: You have an Assets folder in your project with file paths that look like this:<br>`Assets/Images/My-Image.JPG` that you want to change to this<br>`assets/images/my-image.jpg`

2. Next, we remove all the files from version control only with<br>`git rm -r --cached Assets` <br>(This will "remove" files "-recursively" from git's "--cached" memory only and not physically delete your files).

   - Note: you can do a single file by leaving off the `-r` and pointing to a direct file, such as<br>`git rm --cached Assets/Images/My-Image.JPG`

3. Last, do a standard add, commit, and push to add in your new files with changed casing, and push them up.
