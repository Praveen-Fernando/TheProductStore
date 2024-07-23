import { useEffect, useState } from "react";
import Contents from "./Contents";
import { UserService } from "../service/UserService";
import Authentication from "../auth/Authentication";

export default function LoggedUser() {
  const { profileInfo } = Authentication();

  return (
    <div>
      <Contents profileInfo={profileInfo} />
    </div>
  );
}
