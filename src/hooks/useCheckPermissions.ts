import { useSelector } from "react-redux";
import { permissions as statePermissions } from "@stores/permissionSlice";

export const useCheckPermissions = (
  permissionsToCheck: string[],
  checkType: "any" | "all" = "all"
): boolean => {
  const permissions = useSelector(statePermissions);
  const permissionsList = permissions.permissions.map(
    (permission) => permission.codename
  );
  if (checkType === "any") {
    return permissionsToCheck.some((permission) =>
      permissionsList.includes(permission)
    );
  }
  return permissionsToCheck.every((permission) =>
    permissionsList.includes(permission)
  );
};
