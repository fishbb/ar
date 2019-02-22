# IPFS VR Instruction

## Create VR Content

Create the VR webpage by modifying the existing example at https://codepen.io/loudan/pen/dwrpbm

### Basic Objects

Introduce to a few objects that can be created with code directly in a webpage. Choose the ones you would like to use for your project. You can also modify some basic parameters to change how the objects look like in VR.

* text with tag `<a-text>`

  You can modify the text, font, size, color, position and rotation. 

* cylinder with tag `<a-cylinder>`

  You can modify the hight, radius, position, color and rotation.

* sphere with tag `<a-sphere>`

  You can modify the radius, position, color and rotation.

* box with tag `<a-box>`

  You can modify the color, position and rotation. 

Once you finished editing the objects, copy paste the html code and save it in a file as `xxx.html` (replace xxx with the file name)

### IPFS

On a machine installed with IPFS, use the following command to add the webpage to the distributed web. 

```
ipfs add -r xxx.html
```