import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({

name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minlength: 2,
    maxlength: 100,
},
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0,"Price is greater than or equal to 0"]
    },
currency: {
    type: String,
    required: [true, 'Subscription currency is required'],
    enum: ['USD','EUR','GBR','UGX'],
    default: 'UGX'

},
frequency: {
    type: String,
    enum: ['daily','weekly','monthly','yearly'],

},

category: {
    type: String,
    enum: ['sports','news','entertainment','lifestyle','technology','finance','politics','other'],
    required: [true, 'Subscription category is required'],
},

paymentMethod: {
    type: String,
    required: [true, 'Subscription payment methods are required'],
    trim: true,
},
status: {
    type: String,
    enum: ['active', 'canceled','expired'],
    default: 'active',
},
startDate: {
    type: Date,
    required: [true, 'Subscription startDate is required'],
    validate: {
        validator: (value) => {
            return (value) <= new Date();
        },
        message: 'Subscription startDate must be in the past',
    }
},
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'Subscription renewalDate must be after the start date',
        }
    },
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Subscription user is required'],
    index: true,
}
}, {timestamps: true});

// Auto calculate the renewal date if missing
    SubscriptionSchema.pre('save',function (next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //Auto update status if renewal date has passed
    if (this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;