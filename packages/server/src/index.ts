import cors from "cors";
import express from "express";
import { validatePassword } from "@mariusbongarts/medium-monorepo-shared/src";

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (_req: express.Request, res: express.Response) => {
  console.log(_req);
  console.log(validatePassword("dhiohsaiodh"));
  const passwordIsValid = validatePassword("dhiohsaiodh");
  res.json(passwordIsValid);
});

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);
