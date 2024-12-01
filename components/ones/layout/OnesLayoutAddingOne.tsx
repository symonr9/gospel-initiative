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
import { createOne, updateActionSteps } from '@/requests/oneRequests';
import { getNow } from '@/utils/appUtils';

type IOnesLayoutAddingOne = ViewProps & {
    oneForm: OneForm,
    setAppError: Function,
    executor: User,
    refreshData: Function,
    setMessage: Function,
    setOneForm: Function,
    setSelectedOneId: Function,
    revertToInitialLayoutType: Function
};

export function OnesLayoutAddingOne({ oneForm, setAppError, executor, setSelectedOneId,
    refreshData, setMessage, setOneForm, revertToInitialLayoutType }: IOnesLayoutAddingOne) {
    const onSave = async () => {
        const newOne = new One(
            "",
            oneForm.name,
            oneForm.icon,
            oneForm.stage,
            oneForm.category,
            getNow(),
            [],
            false,
            executor.id,
            [],
            [],
            [],
            []
        );

        try {
            const response = await createOne(newOne);
            if (response.error) {
                setAppError(new AppError('Error adding one: ', response.error));
                return;
            }

            if (oneForm.actionSteps?.length > 0) {
                const actionStepResponse = await updateActionSteps(oneForm.actionSteps, response.id);
                if (actionStepResponse.error) {
                    setAppError(new AppError('Error adding action steps: ', response.error));
                    return;
                }
            }

            refreshData(RefreshSpec.Ones);
            setOneForm(OneForm.createDefault());
            setSelectedOneId(response.id);
            setMessage("Your One has been successfully created!");
            revertToInitialLayoutType();
        } catch (err: any) {
            setAppError(new AppError('Error adding one: ', err));
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

            <AddEditOneForm initialOneForm={OneForm.createDefault()} />
        </PageColumn>
    );
}