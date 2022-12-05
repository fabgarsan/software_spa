import { useQuery } from "@tanstack/react-query";
import { AxiosDjangoSerializerDetailError } from "@dto/common";
import { fetchOptCodes, GetOptCodeResponse } from "@api/authenticator";
import { fetchOptCodesByUser } from "@api/user";

export const useFetchOptCodesCurrentUserQuery = ({
  enabled,
}: {
  enabled: boolean;
}) =>
  useQuery<GetOptCodeResponse[], AxiosDjangoSerializerDetailError>(
    ["otp-codes", "current-user"],
    () => fetchOptCodes().then((res) => res.data),
    {
      cacheTime: 0,
      enabled,
    }
  );

export const useFetchOptCodesByUserIdQuery = ({
  enabled,
  userId,
}: {
  enabled: boolean;
  userId: number;
}) =>
  useQuery<GetOptCodeResponse[], AxiosDjangoSerializerDetailError>(
    ["otp-codes", userId],
    () => fetchOptCodesByUser(userId).then((res) => res.data),
    {
      cacheTime: 0,
      enabled,
    }
  );

export const useFetchOptCodesQuery = ({ userId }: { userId?: number }) => {
  const fetchOptCodesByUserIdQuery = useFetchOptCodesByUserIdQuery({
    userId: userId || 0,
    enabled: !!userId,
  });
  const fetchOptCodesCurrentUserQuery = useFetchOptCodesCurrentUserQuery({
    enabled: !userId,
  });
  if (userId) return fetchOptCodesByUserIdQuery;
  return fetchOptCodesCurrentUserQuery;
};
