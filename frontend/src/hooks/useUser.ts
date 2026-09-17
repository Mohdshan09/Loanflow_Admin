import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUserById, createUser, deleteUser } from "../api/user.api";
import type { CreateUserInput } from "../types/user.types";

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
};

export const useUser = (id: string) => {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => getUserById(id),
        enabled: Boolean(id),
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateUserInput) => createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
        },
    });
};
