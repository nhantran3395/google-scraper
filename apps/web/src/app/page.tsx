import { log } from "logger";

export const metadata = {
  title: "Scrapper",
};

export default function Store(): JSX.Element {
  log("Hey! This is the Scrapper UI.");

  return (
    <div className="container">
      <h1 className="title">Scrapper</h1>
    </div>
  );
}
