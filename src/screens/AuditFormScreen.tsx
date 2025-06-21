import React, { useState } from 'react';
import { View } from 'react-native';
import { StepForm } from '../components/StepForm';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addAudit, updateAudit } from '../storage/auditStorage';
import { useBackHandler } from "../hooks/useBackHandler";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'

const AuditFormScreen = () => {
    const navigation = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const route = useRoute();
    const { initialData } = route.params || {};

    useBackHandler(() => {
        navigation.goBack();
        return true;
    });

    const handleSubmit = async (formData: any) => {
        console.log("Form Data:", formData);
        console.log("Id:", uuidv4());
        const audit = {id: uuidv4(), ...formData};
        console.log("Audit Data:", audit);

        try {
            if (initialData?.id) {
                await updateAudit(audit);
            } else {
                await addAudit(audit);
            }

            navigation.reset({
                index: 0,
                routes: [{ name: 'AuditHistory' }],
            });
        } catch (error) {
            console.error("Error submitting audit:", error);
        }
    };



    return (
        <View style={{height:'100%', backgroundColor: '#fff' }}>
            <StepForm onSubmit={handleSubmit} initialData={initialData} />
        </View>
    );
};

export default AuditFormScreen;
