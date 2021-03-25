# React Redux FastAPI Login page
Project that allows for logging in into artificial system with otp challenge support.
## How to run this
* `docker-compose build`
* `docker-compose up`
* Go to http://localhost:3000

### Loom video
https://www.loom.com/share/aabc7599aa1c4e448e19599225b36c05

### Credentials
| Login  | Password | OTP enabled | Valid OTP |
| ------------- | ------------- | ------------- | -------------  | 
| janedoe@example.com  | secret  | yes | 111111 |
| johndoe@example.com  | secret  | no | - |

## Time log
* 00:30 - looking for fastapi / react / redux cookiecutter to quickly bootstrap env
* 00:35 -  initializing project with https://github.com/Buuntu/fastapi-react
* 00:45 - withdrawing from above idea - too much assumptions and obsolete stuff
* 00:55 - looking for create-react-app templates starting project with  initiating frontend `npx create-react-app frontend --template redux-typescript`
* 01:30 - finished implementing frontend (reminiding myself react on the go)
* 02:30 - finished implementing backend - based on https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/ 
* 02:40 - readme, timelog, cleanup

Total time spent: 2 hours 10 minutes
## TODO
* logging out after token expires (clearing if it's outdated or after 401)
* extending token life 
* adding automated tests
* commit stuff while working so time log creates itself...
