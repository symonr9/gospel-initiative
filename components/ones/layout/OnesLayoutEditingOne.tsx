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
import { updateOne, removeOne } from '@/requests/oneRequests';
import SimpleIconFormButton from '@/components/common/SimpleIconFormButton';

type IOnesLayoutEditingOne = ViewProps & {
    selectedOne: One,
    ones: One[],
    oneForm: OneForm,
    setAppError: Function,
    executor: User,
    refreshData: Function,
    setMessage: Function,
    setOneForm: Function,
    setSelectedOneId: Function,
    revertToInitialLayoutType: Function
};

export function OnesLayoutEditingOne({ selectedOne, ones, oneForm, setAppError, executor,
    refreshData, setMessage, setOneForm, setSelectedOneId, revertToInitialLayoutType }: IOnesLayoutEditingOne) {

    const [loading, setLoading] = React.useState(false);

    const onSave = async () => {
        if (loading)
            return;

        setLoading(true);

        try {
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
        } finally {
            setLoading(false);
        }
    };

    const onRemove = async () => {
        if (loading)
            return;

        setLoading(true);

        try {
            try {
                const response = await removeOne(selectedOne);
                if (response.error) {
                    setAppError(new AppError('Error removing one: ', response.error));
                    return;
                }

                refreshData(RefreshSpec.Ones);
                setOneForm(OneForm.createDefault());
                setSelectedOneId(ones.length > 0 ? ones[0].id : null);
                setMessage("Your One has been successfully removed!");
                revertToInitialLayoutType();
            } catch (err: any) {
                setAppError(new AppError('Error removing one: ', err));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageColumn>
            <PageRow verticalMargins>
                <SimpleIconFormButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => revertToInitialLayoutType()}
                    info
                    title={'Back'} />
            </PageRow>

            <AddEditOneForm editing
                onRemove={onRemove}
                initialOneForm={selectedOne} />

            <PageRow spaceBetween verticalMargins>
                <PageRow></PageRow>
                <SimpleIconFormButton iconSrc={AppIcon.Save}
                    onClick={onSave}
                    disabled={loading}
                    success
                    title={'Save'} />
            </PageRow>
        </PageColumn>
    );
}