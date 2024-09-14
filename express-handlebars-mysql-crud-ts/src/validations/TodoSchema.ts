import { object, string } from 'zod';

export const CreateTodoSchema = object({

    task: string()
        .min(3)
        .max(150)

});
