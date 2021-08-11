import cors from "cors";
import express from "express";
import { validatePassword } from "@mariusbongarts/medium-monorepo-shared/src";

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req: express.Request, res: express.Response) => {
  const validationResults = validatePassword(req.body.password);
  res.json(validationResults);
});

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);
