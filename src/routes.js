import { buildRoutePath } from "./utils/build-route-path.js";
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const db = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const title = req.body.title;
      const description = req.body.description;

      const task = {
        id: randomUUID(),
        title: title,
        description: description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
      };

      db.insert("tasks", task);
      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.query;

      const tasks =
        title || description
          ? db.select("tasks", {
              title: title,
              description: description,
            })
          : db.select("tasks");

      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const [task] = db.select("tasks", { id: id });

      if (!task) {
        return res.writeHead(404).end("Task not found");
      }

      if (title && !description) {
        task.title = title;
      }
      if (!title && description) {
        task.description = description;
      }
      if (!title && !description) {
        return res
          .writeHead(400)
          .end(JSON.stringify("Title or description are required in body"));
      }
      if (title && description) {
        task.title = title;
        task.description = description;
      }

      task.updated_at = new Date();

      db.update("tasks", task);

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = db.select("tasks", { id: id });

      if (!task) {
        return res.writeHead(404).end("Task not found");
      }

      db.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const [task] = db.select("tasks", { id: id });

      if (!task) {
        return res.writeHead(404).end("Task not found");
      }

      const isTaskCompleted = task.completed_at !== null ? true : false;
      const updateCompleteStatusTask = isTaskCompleted ? null : new Date();
      task.completed_at = updateCompleteStatusTask;

      db.update("tasks", task);

      return res.writeHead(204).end();
    },
  },
];
