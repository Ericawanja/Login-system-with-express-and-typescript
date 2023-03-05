# How to create a login system with Express, Typescript, and MsSQL
Most applications require an authetication fuctionality, But how do you go about? Let's find out.

## Table of contents
- Setting up the backend
- Connecting to the database
- Creating the Register Endpoint
- Creating the Login Endpoimt
- Validating inputs with Joi 

# 1. Setting up typescript expressJs backend
```
npm init -y
npm i typescript --save-dev
npx tsc --init
npm i express dotenv mssql 
```
Create the project folder, inside the folder create two more folders, dist, and src. The dist folder will be the out directory which contains the compiled .js files while the src folder will contain the .ts files (of course, we are not writing javascript. The typescript files are compiled to javascript during the execution)

To begin, we need to create a package.json file which records the metadata, defines the entrypoint and fuctional attributes of a project.

There are two ways to create a package.json file, `npm i-init` and `npm init -y`. The second command is the most preferred and first since you do not have to answer a list of questions

Next, we need to setup typescript in our project. Run `npm i typescript --save-dev` to install typescript, and `npx tsc --init` to intialize a tsConfig file. The [tsConfig file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#:~:text=The%20tsconfig.json%20file%20specifies,compiler%20flags%20enabled%20by%20default.) contains compiler options used to compile the project and  the root directory details which contains our .ts file and out directory file which contains the compiled .js files.

Edit the tsConfig file to set `src` as the `rootDir` and `dist` as the `outFile` as shown below;

```json
{
  "compilerOptions": {
  //...

  
    "module": "commonjs",                                /* Specify what module code is generated. */
     "rootDir": "./src",                                  /* Specify the root folder within your source files. */
    // "moduleResolution ...
     "outDir": "./dist",                                   /* Specify an output folder for all */
     //...

  }
}

```
## 2. How to connect typescript express backend to mssql Database (Connecting to the database)

Create .env file at the root. The .env file contain project credentials in key-value format for services used by the program. For security purposes, the .env file should only be available locally. To achieve that have a .gitignore file and specify all the fles 


