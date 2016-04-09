# pycon-app

Pycon app- the application for pycon.
=====================================

Welcome! this is the repo for the pycon app, first built for the first pycon in Israel.
If you think you can use it for your own pycon or whatever you are welcome to get it and use it.

Contribute
----------

1. First you should create the environment for the development. We use cordova for the app, which we need to install through npm:

    npm install -g cordova

2. After installing cordova you need to create a project (since the repo have only the code for our app without the hooks, platforms code or plugins).

    cordova create project_name com.example.il.pycon pycon_il
    
When project name should be the name of your choosing and it will be the name of the root directory of the project you created.

3. Create an android app to work with.

    cordova platform add android

If you want you can add any platform you want by running the same command with the name of the platform you want instead of android.

4. Delete the default xml file in the root directory created after the last point and the www directory.

    cd ./project_name/
    rm -R ./www ./config.xml

5. Clone the repo to your computer

    git clone https://github.com/moshe742/pycon-app.git

This will create a directory named pycon-app, copy to it all the content of the project files and directories left there after deleting the config file and www directory.

That's it, you can start working and contributing :)

If there is any problem with this let me know and I will improve this accordingly.

6. Copy the images from www/images to the relevant directories in pycon-app/platforms/android/res when the icon with hd is going to drawable-hdpi, the one with ld is going to drawable-ldpi and so forth.

TODO:
* Add the ability to check if there is a new schedule every X minutes and download it if there is.
* Change the pycon logo to have transparent background and check for what should be the resolution for each size.

If you have suggestions for more features/bug reports I would like to hear them, thanks!
