const {setConfiguratrion} = require('./utils');

module.exports = {
    device: null,
    node: null,
    pu: 175,
    capability: 'cool_fahrenheit_temp_set',
    init: function (device, node) {
        device.appkits['pu' + this.pu] = this;
        this.startReport(device);
        return this;
    },
    registerCapability: function () {
        return this;
    },

    startReport: function (device) {
        device.registerCapabilityListener(this.capability,
            async (payload) => {
                let runModeCapValue = device.getCapabilityValue(this.capability);
                console.log('cool_fahrenheit_temp_set SET:', payload, runModeCapValue);
                setConfiguratrion(device, null, this.pu, 2, false, payload * 10);
            }
        );
        return this;
    },
    setConfig: function (device, payload) {
        console.log('cool_fahrenheit_temp_set SET:', payload);
        setConfiguratrion(device, null, this.pu, 2, false, payload * 10);
    },
    update: function (device, payload, config) {
        if (!device.hasCapability(this.capability)) return;
        let runModeCapValue = device.getCapabilityValue(this.capability);
        console.log('heat_celsius_temp_set REV:', runModeCapValue, config);
        device.setCapabilityValue(this.capability, config).catch(this.error);
    }
}  