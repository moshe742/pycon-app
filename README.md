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
    
When project name should be the name of your choosing and it will be the name of the root directory of the project.

3. Delete the default xml file in the root directory created after the last point and the www directory.

    cd ./project_name/
    rm -R ./www ./config.xml

4. Clone the repo to your computer

    git clone https://github.com/moshe742/pycon-app.git

This will create a directory named pycon-app, copy to it all the content of the project files and directories left there after deleting the config file and www directory.

That's it, you can start working and contributing :)

If there is any problem with this let me know and I will improve this accordingly.

TODO:
* Make the app with a section of my schedule which will be with all the events/lectures one chose (now there is only the possibility to choose a lecture to attend, but it only shows it as selected, and you can choose events that happen on the same time).
* Add the ability to check if there is a new schedule every X minutes and download it if there is.
* Use the pycon-il logo for the logo of the app.

If you have suggestions for more features/bug reports I would like to hear them
