import { useQuery } from "react-query";
import { getRoomList } from "../services/chat";

export const useFetchRooms = () => {
  const { data, isLoading, refetch } = useQuery(`rooms`, async () => {
    const res = await getRoomList();
    const roomList = res;

    return roomList;
  });

  return { roomList: data, isLoadingRoom: isLoading, updateRoomList: refetch };
};
