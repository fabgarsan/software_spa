import { useSelector } from "react-redux";
import { permissions as statePermissions } from "@stores/permissionSlice";
import { GenericPermission } from "@utils/instancesDescriptors";

type CheckedGenericPermissions = {
  LIST: boolean;
  ADD: boolean;
  CHANGE: boolean;
  DELETE: boolean;
  VIEW: boolean;
  HAS_ANY: boolean;
  HAS_ALL: boolean;
};

const useCheckGenericUserPermissions = (
  genericPermission: GenericPermission
): CheckedGenericPermissions => {
  const permissions = useSelector(statePermissions);
  const permissionsList = permissions.permissions.map(
    (permission) => permission.codename
  );
  const genericPermissionList = Object.values(genericPermission).map(
    (permission) => permission
  );
  return {
    LIST: permissionsList.includes(genericPermission.LIST),
    ADD: permissionsList.includes(genericPermission.ADD),
    CHANGE: permissionsList.includes(genericPermission.CHANGE),
    DELETE: permissionsList.includes(genericPermission.DELETE),
    VIEW: permissionsList.includes(genericPermission.VIEW),
    HAS_ANY: genericPermissionList.some((permission) =>
      permissionsList.includes(permission)
    ),
    HAS_ALL: genericPermissionList.every((permission) =>
      permissionsList.includes(permission)
    ),
  };
};

export default useCheckGenericUserPermissions;
