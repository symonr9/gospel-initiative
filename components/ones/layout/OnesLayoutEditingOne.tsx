import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';
import SimpleIconButton from '@/components/common/SimpleIconButton';
import { AppIcon, RefreshSpec } from '@/enums/enums';
import OneForm from '@/models/oneForm';
import React from 'react';
import { ViewProps } from "react-native";
import AddEditOneForm from '../AddEditOneForm';
import AppError from '@/models/error';
import One from '@/models/one';
import User from '@/models/user';
import { updateOne } from '@/requests/oneRequests';

type IOnesLayoutEditingOne = ViewProps & {
    selectedOne: One,
    oneForm: OneForm,
    setAppError: Function,
    executor: User,
    refreshData: Function,
    setMessage: Function,
    setOneForm: Function,
    revertToInitialLayoutType: Function
};

export function OnesLayoutEditingOne({ selectedOne, oneForm, setAppError, executor, 
    refreshData, setMessage, setOneForm, revertToInitialLayoutType }: IOnesLayoutEditingOne) {
        const onSave = async () => {
            const updatedOne = {
                ...selectedOne,
                name: oneForm.name,
                icon: oneForm.icon,
                stage: oneForm.stage,
                category: oneForm.category,
                gospelChecklist: oneForm.gospelChecklist
            };

            try {
                const response = await updateOne(updatedOne);
                if (response.error) {
                    setAppError(new AppError('Error updating one: ', response.error));
                    return;
                }

                refreshData(RefreshSpec.Ones);
                setOneForm(OneForm.createDefault());
                setMessage("Your One has been successfully updated!");
                revertToInitialLayoutType();
            } catch (err: any) {
                setAppError(new AppError('Error updating one: ', err));
            }
        };

    return (
        <PageColumn>
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        revertToInitialLayoutType();
                    }}
                    title={'Back'} />
                <SimpleIconButton iconSrc={AppIcon.Save}
                    onClick={onSave}
                    title={'Save'} />
            </PageRow>

            <AddEditOneForm editing 
                initialOneForm={selectedOne} />
        </PageColumn>
    );
}