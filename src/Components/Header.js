// html component
import { format } from "date-fns";

function Header() {
    return (
      <header>
        <h1 class="text-5xl pt-8 py-4">Todo List</h1>
        <h2 class="text-lg text-gray-400">
          {format(new Date(), "MMMM do yyyy")}
        </h2>
        <br />
      </header>
    );
  }

  export default Header;