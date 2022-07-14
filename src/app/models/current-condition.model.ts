import {CurrentConditionDataModel} from './current-condition-data.model';

export interface CurrentConditionModel {
    zipcode: string;
    country: string;
    data: CurrentConditionDataModel;
}
