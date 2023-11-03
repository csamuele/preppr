import exp from "constants";

export interface Credentials {
    email: string;
    password: string;
}
export interface UserFormData {
    email: string;
    password: string;
    confirm: string;
    firstName: string;
    lastName: string;
}
export interface UserResponse {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    last_login: string;
}

export interface User {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    lastLogin: string;
}

export interface RestaurantFormData {
    name: string;
    description: string;
}

export interface RestaurantResponse {
    restaurant_id: string;
    name: string;
    description: string;
    user_id: string;
}

export interface Restaurant {
    restaurantId: string;
    name: string;
    description: string;
    userId: string;
}