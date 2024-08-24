import React from 'react';
import { View, type ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { SimpleCard } from './SimpleCard';
import { Page } from '@/enums/enums';
import { openPage } from '@/redux/actions';
import { SimpleIconButton } from './SimpleIconButton';

export type ISimpleBackIconButton = ViewProps & {
    iconSrc: string | null;
    title: string;
    pageToOpen: Page;

    openPage: (page: Page) => void;
}

function SimpleBackIconButton({ iconSrc = null, title,
    pageToOpen, openPage
}: ISimpleBackIconButton) {

    const onClick = () => {
        openPage(pageToOpen);
    }

    return (
        <SimpleIconButton iconSrc={iconSrc}
            title={title}
            onClick={onClick} />
    );
};

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {
    openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleBackIconButton);