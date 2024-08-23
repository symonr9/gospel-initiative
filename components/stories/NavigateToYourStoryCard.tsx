import React from 'react';

import { connect } from 'react-redux';

import { View, type ViewProps } from 'react-native';

import { AppIcon, Page } from '@/enums/enums';
import SimpleNavigateToCard from '../common/SimpleNavigateToCard';

export type INavigateToYourStoryCard = ViewProps & {

};

function NavigateToYourStoryCard({ }: INavigateToYourStoryCard) {

    return (
        <SimpleNavigateToCard iconSrc={AppIcon.Man1} 
                       title={"Your Story"} 
                       pageToOpen={Page.YourStory}/>
    );
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(NavigateToYourStoryCard);