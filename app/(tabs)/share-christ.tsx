
import React from 'react';

import { connect } from 'react-redux';
import { addPrayer } from '../../redux/Actions';

import PageView from '@/components/common/PageView';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/Styles';
import { OnesListView } from '@/components/ones/OnesListView';

function ShareChrist({ prayers }) {

    const handleAdd = () => {
        const newItem = { id: Date.now(), name: 'New Item' };
        addPrayer(newItem);
    };

    return (
        <PageView>
            <ThemedView style={tabStyles.titleContainer}>
                <ThemedText type="title">Share Christ</ThemedText>
            </ThemedView>

            <OnesListView />


            <button onClick={handleAdd}>Add Item</button>
            <ul>
                {prayers.map(item => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>


        </PageView>
    );
}


const mapStateToProps = (state: object) => ({
    prayers: state.prayers
});


const mapDispatchToProps = {
    addPrayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);