# This is a full ready to use front to back project(backend, dataBase, API, frontend)

Its a web app for a delivery company, **you can't use this project for commercial or profitable use!**

This is my own project, so if you have some positive critics or ideas I would like to hear about it.

**It have a lot of things to be improved.**

## Requirements for running SmartDelivery

#### First, you need to run react (frontend) and Server (backend) on different shells.

### To run django Server and restframework(API):

- Install python
- Next cd folder backend
- Create a virtual environment: `virtual virtualenv env`
- Enabling the virtual environment `env / Scripts / activate source` OR source `env/Scripts/activate`
- `pip install -r requirements.txt`
- `python manage.py makemigrations`
- `python manage.py migrate`
- `python manage.py createsuperuser`
- run the command `python manage.py runserver`
- localhost: 8000 / admin -> access to django
- Login admin through:
  username: username that you selected when creating super user
  password: password that you selected when creating super user
- To access the api just put "/ api" in the url, it is necessary to have the login done. Ex: localhost: 8000 / api
- Also create a .txt file for example to host your SECRET_KEY

### To run react:

- Install nodejs (if not)
- Install the npm packages in the gui folder (through the command: `npm i` or `npm install`)
- To see the project frontend run the `npm start` command, it will open in localhost: 3000

**PS: the css is really bad i know, and outdated but was done fast and without any structure with the idea to be changed in the future!**
