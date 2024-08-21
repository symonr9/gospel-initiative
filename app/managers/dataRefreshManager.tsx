
import { AvatarIcon, OneStage, PrayerType } from '@/enums/enums';
import One from '@/models/one';
import PrayerRequest from '@/models/prayerRequest';
import { loadServerData } from '@/redux/actions';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

const prayersJson = require('../../data/prayers.json');
function getPrayersFromJson() {
    return prayersJson.map(item => {    
        const type = PrayerType[item.type as keyof typeof PrayerType];    
        return {
            id: item.id,
            name: item.name,
            lastPrayedAt: item.lastPrayedAt ? new Date(item.lastPrayedAt) : undefined,
            userId: item.userId,
            oneId: item.oneId,
            requests: [],
            type: type
        };
    });
}

const onesData = require('../../data/ones.json');
function getOnesFromJson() {
    return onesData.map(item => {
        const icon = AvatarIcon[item.icon as keyof typeof AvatarIcon];
        const stage = OneStage[item.stage as keyof typeof OneStage];
        
        return new One(
            item.id,
            item.name,
            icon,
            stage,
            item.nextMeetingAt ? new Date(item.nextMeetingAt) : undefined,
            [],  // meetings (assuming you populate this later)
            [],  // prayers (assuming you populate this later)
            [],  // actionSteps (assuming you populate this later)
            [],  // facts (assuming you populate this later)
            new Date(item.prayingSince),
            false // hidden (set this based on your logic)
        );
    });
}

export type IDataRefreshManager = {
    loadServerData: (data: any) => void,
};

function DataRefreshManager({ loadServerData }: IDataRefreshManager) {

    useEffect(() => {
        console.log("First time page load");
        
        loadServerData({
            ones: getOnesFromJson(),
            prayers: getPrayersFromJson()
        });
    }, []);

    return <></>;
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {
    loadServerData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataRefreshManager);