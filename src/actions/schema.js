import { schema } from 'normalizr';

export const surveySchema = new schema.Entity('surveys', {}, { idAttribute: 'uuid' });
export const surveyListSchema = [surveySchema];