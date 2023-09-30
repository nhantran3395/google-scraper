import { log } from "logger";

export const metadata = {
  title: "Scrapper",
};

export default function Store(): JSX.Element {
  log("Hey! This is the Scrapper page.");

  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
    </div>
  );
}
