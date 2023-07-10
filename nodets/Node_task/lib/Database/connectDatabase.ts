import mysql from 'mysql';

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Root@1234$",
    database:"nodejs"
});

export const connectNodeDatabase = () => {
    return new Promise((resolve, reject) => {
        try {
            connection.connect((error) => {
                if (error) return reject(error);
                return resolve('Database connected sucessfully');
            })

        } catch (error) {
            console.log("connectDatabase.ts: database connection ~ error", error)
        }
    })
};

export const executeQuery = (sqlQuery: string) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(sqlQuery, (error, response) => {
                console.log("connectDatabase.ts ~ connection.query ~ error:", error)
                if (error) return reject(error)
                return resolve(response)
            })
        } catch (error) {
            console.log("connectDatabase.ts ~ returnnewPromise ~ error:", error)

        }
    })
};