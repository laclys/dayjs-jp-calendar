import ReactDOM from "react-dom/client";
import dayjs from "dayjs";
import App from "./App.tsx";
import { jpCalendar } from "dayjs-jp-calendar";
import "dayjs/locale/ja";
import "./index.css";

dayjs.extend(jpCalendar);
dayjs.locale("ja");

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
