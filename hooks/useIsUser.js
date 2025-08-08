import { useQuery } from "@tanstack/react-query";
import { isUser } from "../api/userActions";

export function useIsUser() {
  const {
    isLoading,
    data: isLoggedInUser,
    error,
  } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: isUser,
  });

  return { isLoggedInUser };
}
