import { Request, Response } from "express";
import { httpStatus } from "../../utils/httpStatus";

const users = [
  {
    id: 1,
    name: "Agus",
  },
  {
    id: 2,
    name: "Bayu",
  },
  {
    id: 3,
    name: "Caca",
  },
];

export const getUsers = (req: Request, res: Response) => {
  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "Success",
    data: users,
  });
};

export const postUser = (req: Request, res: Response) => {
  const payload = req.body;

  const lastId = users[users.length - 1].id;

  users.push({
    id: lastId + 1,
    name: payload.name,
  });

  return res.status(httpStatus.CREATED).json({
    code: httpStatus.OK,
    message: "Success",
    data: users,
  });
};

export const getUser = (req: Request, res: Response) => {
  // const { id } = req.params
  const id = req.params.id;

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

  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "Success",
    data: users,
  });
};
