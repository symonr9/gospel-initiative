import React from 'react';

import { connect } from 'react-redux';

import { View, type ViewProps } from 'react-native';

import { AppIcon, Page } from '@/enums/enums';
import SimpleNavigateToCard from '../common/SimpleNavigateToCard';

export type INavigateToGodsStoryCard = ViewProps & {

};

function NavigateToGodsStoryCard({ }: INavigateToGodsStoryCard) {

    return (
        <SimpleNavigateToCard iconSrc={AppIcon.Man1} 
                       title={"God's Story"} 
                       pageToOpen={Page.GodsStory}/>
    );
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(NavigateToGodsStoryCard);