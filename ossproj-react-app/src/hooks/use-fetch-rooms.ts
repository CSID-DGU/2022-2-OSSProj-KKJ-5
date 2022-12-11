import { useQuery } from "react-query";
import { useUserState } from "../context/user-context";
import { getRoomList } from "../services/chat";

export const useFetchRooms = () => {
  const user = useUserState();
  const { data, isLoading, refetch, isSuccess } = useQuery(
    `rooms`,
    async () => {
      const res = await getRoomList();
      const roomList = res;
      return roomList;
    }
  );


  return {
    roomList: data,
    isLoadingRoom: isLoading,
    isFetch: isSuccess,
    updateRoomList: refetch,
  };
};
