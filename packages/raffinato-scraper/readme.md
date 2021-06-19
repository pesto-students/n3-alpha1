# Uploading files via Cloudinary CLI

## 1. Download Cloudinary CLI
```
  //Prerequisite: To use the Cloudinary CLI, you need Python 3.6 or later.
  //You can install Python from https://www.python.org. The Python Package Installer (pip) is installed with it.

  pip3 install cloudinary-cli
```

## 2. Connect CLI to your account
```
  export CLOUDINARY_URL=cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyzA@cloud_name
```

## 3. Push/Pull to sync local & Cloudinary folder
```
  cld sync --push [local folder] [cloudinary target folder]
```
## Done. 💯
