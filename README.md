# box-admin-tools
Useful scripts for Box administration

RequestReport is a nodejs script using the playwright tool to automate logging into the Box website and requesting a report. Since Box has never provided an API for reporting, we have to resort to web-scraping to kick them off. Fortunately, playwrite (https://playwright.dev/) came along to make that easy.

This is a demonstration script, which will definitely require modification to fit the login screen for your domain. It requests the Collaboration report; most other reports can be fairly simply selected with changes to this script. Ones such as Activities which have more parameters to fill in will require more expertise in writing playwright scripts. However, this should get you started.

This script is provided as-is without support.
