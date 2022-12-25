# Delta (social media)

Delta is a social media where User can Register with OTP verification and login. Then he can access to feedpage where user can posts,like and comment . View Live Notifications, Follow and Unfollow Connections , Chat with friends , Profile Settings . Admin can Manage POST and USER Management.


## API Reference



#### Get HomePage

http
  GET /deltasocial.tk


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | *Required*. Your API key |

#### Get Login

http
  GET /deltasocial.tk/login


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | *Required*. Your API key |


#### Get feed

http
  GET /deltasocial.tk/feed


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | *Required*. Your API key |



#### Block Users

http
  GET /deltasocial.tk/BlockUser/${userId}


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | *Required*. Id of item to fetch |



## Run Locally

Clone the project

bash
  git clone https://github.com/kousallya123/deltasocial.git


Go to the project directory

bash
  cd my-project


Install dependencies

bash
  npm install


Start the server

bash
  npm run start



## 🚀 About Me
I'm Kousallya B, Passionate full stack developer...


