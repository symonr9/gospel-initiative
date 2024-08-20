
import React from 'react';

import { connect } from 'react-redux';
import { addPrayer } from '../../redux/actions';

import PageView from '@/components/common/PageView';
import { ThemedText, ThemedTextType } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/Styles';
import { OnesListView } from '@/components/ones/OnesListView';
import Prayer, { generateRandomPrayer } from '@/models/prayer';

interface IShareChrist {
    prayers: Prayer[];
    addPrayer: (prayer: Prayer) => void;
}

function ShareChrist({ prayers, addPrayer }: IShareChrist) {

    const handleAdd = () => {
        const newItem = generateRandomPrayer("user1", "one1");
        addPrayer(newItem);
    };

    return (
        <PageView>
            <ThemedView style={tabStyles.titleContainer}>
                <ThemedText type={ThemedTextType.Title}>Share Christ</ThemedText>
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

const mapStateToProps = (state: IShareChrist) => ({
    prayers: state.prayers
});


const mapDispatchToProps = {
    addPrayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);