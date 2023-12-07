import { readFileSync, writeFileSync } from "fs";
import { httpStatus } from "../../utils/httpStatus";
import { Request, Response } from "express";

const readFileFromJson = (): { id: number; name: string }[] => {
  const users = readFileSync("src/data/users.json", "utf-8");
  return JSON.parse(users);
};

const writeFileIntoJson = (
  data: {
    id: number;
    name: string;
  }[]
): { id: number; name: string }[] => {
  writeFileSync("src/data/users.json", JSON.stringify(data, null, 2), "utf8");

  return data;
};

export const getUsers = (req: Request, res: Response) => {
  const users = readFileFromJson();

  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "Success",
    data: users,
  });
};

export const postUser = (req: Request, res: Response) => {
  const users = readFileFromJson();
  const payload = req.body;

  const lastId = users[users.length - 1].id;

  users.push({
    id: lastId + 1,
    name: payload.name,
  });

  writeFileIntoJson(users);

  return res.status(httpStatus.CREATED).json({
    code: httpStatus.OK,
    message: "Success",
    data: users,
  });
};

export const getUser = (req: Request, res: Response) => {
  const users = readFileFromJson();
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(httpStatus.BAD_REQUEST).json({
      code: httpStatus.BAD_REQUEST,
      message: "Id must be integer",
    });
  }

  const user = users.filter((user) => user.id === Number(id));
  if (user.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND,
      message: `User with id ${id} not found`,
    });
  }

  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "Success",
    data: user[0],
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const users = readFileFromJson();
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(httpStatus.BAD_REQUEST).json({
      code: httpStatus.BAD_REQUEST,
      message: "Id must be integer",
    });
  }

  const indexOfUser = users.map((user) => user.id).indexOf(Number(id));
  if (indexOfUser === -1) {
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND,
      message: `User with id ${id} not found`,
    });
  }

  users.splice(indexOfUser, 1);
  writeFileIntoJson(users);

  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "Success",
    data: users,
  });
};
