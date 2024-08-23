import React from 'react';
import { View, type ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { useBackgroundThemeColor } from '@/constants/Colors';
import { SimpleCard } from './SimpleCard';
import { Page } from '@/enums/enums';
import { openPage } from '@/redux/actions';

export type ISimpleNavigateToCard = ViewProps & {
  iconSrc: string | null;
  title: string;
  detailsView?: any;
  pageToOpen: Page;

  openPage: (page: Page) => void;
}

function SimpleNavigateToCard({ iconSrc = null, title,
  detailsView = <></>, pageToOpen, openPage
}: ISimpleNavigateToCard) {
  const backgroundColor = useBackgroundThemeColor();

  const onClick = () => {
    openPage(Page.OnesList);
  }

  return (
    <SimpleCard iconSrc={iconSrc}
      title={title}
      detailsView={detailsView}
      onClick={onClick} />
  );
};

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {
  openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleNavigateToCard);