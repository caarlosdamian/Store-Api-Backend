import sqlite3 from "sqlite3";
import config from "config";
import { ADD_USER, COLLECTIONS, IS_MAIL_REGISTERED, LAST_ID, USER_BY_EMAIL, USER_BY_ID } from "./queries.js";

const dbPath = config.get("DB.path");

export const getCollections = () => {
  const data = [];
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.all(COLLECTIONS, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        rows.forEach((row) => {
          const { col_id, title, routeName, item_id, name, price, imageUrl } = row;
          data.push({
            col_id,
            title,
            routeName,
            item_id,
            name,
            price,
            imageUrl,
          });
        });
        resolve(data);
      }
    });
    db.close();
  });
};

export const isEmailRegistered = (email) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.get(IS_MAIL_REGISTERED, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        const { exist } = row;
        resolve(!!exist);
      }
    });
    db.close();
  });
};

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.get(USER_BY_EMAIL, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
    db.close();
  });
};

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.get(USER_BY_ID, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
    db.close();
  });
};

export const insertUser = (displayName, email, password) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    db.run(ADD_USER, [displayName, email, password], (err) => {
      if (err) reject(err);
    }).get(LAST_ID, (err, row) => {
      if (err) {
        reject(err);
      } else {
        const { id } = row;
        resolve(id);
      }
    });
    db.close();
  });
};
