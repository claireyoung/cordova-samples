//
//  CordovaSubscriptions
//  Travel+Leisure
//
//  Created by Claire Young on 3/20/16.
//
//

#import "CordovaSubscriptions.h"

// NOTE: below imports, and most of the commented-out
// code, uses a library to locally decode the receipt,
// with some example code.
//  To get project working this way:
//      1. go to the following sites and drag/drop
//         the xcodeproj's into your project navigator:
//          https://github.com/Cocoanetics/Kvitto
//          https://github.com/Cocoanetics/DTFoundation

//@import Kvitto;
//@import DTFoundation;

@interface CordovaSubscriptions ()


@end

@implementation CordovaSubscriptions

#pragma mark - CDV command


/*
-(void)verifyReceipt:(CDVInvokedUrlCommand*)command
{
    
    DTReceipt *receipt = [self _purchaseReceipt];
    
    for (DTInAppPurchaseReceipt *iapReceipt in receipt.inAppPurchaseReceipts) {
        NSDate* now = [NSDate date];
        
        NSDate* cancellationDate = iapReceipt.cancellationDate;
        NSString* productID = iapReceipt.productIdentifier;
        NSDate* expirationDate = iapReceipt.subscriptionExpirationDate;
        
        
        if ([iapReceipt.subscriptionExpirationDate compare:now] == NSOrderedDescending) {
            NSLog(@"VALID");
        }
        
        NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
        [formatter setDateFormat:@"YYYY-MM-dd"];
        
        NSLog(@"Cancel date %@", [formatter stringFromDate:cancellationDate]);
        NSLog(@"Product ID %@", productID);
        NSLog(@"expirationDate %@", [formatter stringFromDate:expirationDate]);
    }
    
    if ([self _refreshReceiptIsNecessary])
    {
        NSLog(@"%@", @"Receipt Refresh is Necessary");
    }
    else
    {
        NSLog(@"%@", @"Receipt is CURRENT");
    }
}
*/


-(void)verifyReceipt:(CDVInvokedUrlCommand*)command
{
    NSString* sharedSecret = command.arguments[0];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    
    NSURL* receiptURL = [[NSBundle mainBundle] appStoreReceiptURL];
    if (receiptURL == nil) {
        // return error result - no app store receipt URL found.
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }
    
    NSString* receiptPath = receiptURL.path;
    if ([[NSFileManager defaultManager] fileExistsAtPath:receiptPath]) {
        NSData* receiptData = [NSData dataWithContentsOfURL:receiptURL];
        NSString* receiptDataStr = [receiptData base64EncodedStringWithOptions:0];
        
        NSDictionary* receiptDictionary = [[NSDictionary alloc] initWithObjectsAndKeys:
                                           [receiptData base64EncodedStringWithOptions:0], @"receipt-data",
                                           sharedSecret, @"password", nil];
        
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:receiptDictionary];
        
//        NSData* requestData = [NSJSONSerialization dataWithJSONObject:receiptDictionary options:nil error:nil];
//        NSString* storeURL = @"https://sandbox.itunes.apple.com/verifyReceipt";
//        NSMutableURLRequest* storeRequest = [[NSMutableURLRequest alloc] initWithURL: [NSURL URLWithString:storeURL]];
//        [storeRequest setHTTPMethod:@"POST"];
//        [storeRequest setHTTPBody:requestData];
//        
//        NSURLSession* session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
//        
//        [session dataTaskWithRequest:storeRequest completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
//            
//            NSDictionary *result = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
//            
//            NSString *myString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
//            
//            NSLog(myString);
//            
//            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:myString];
//            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//            
//            for(id key in result) {
//                id value = [result objectForKey:key];
//                NSLog(@"%@ : %@", key, value);
//            }
//        }].resume;
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}



#pragma mark - private helper methods

//
//- (DTReceipt *)_purchaseReceipt
//{
//    NSBundle *mainBundle = [NSBundle mainBundle];
//    NSURL *receiptURL = [mainBundle appStoreReceiptURL];
//    
//    // override path for demo
////    receiptURL = [mainBundle URLForResource:@"newReceipt" withExtension:nil];
//    
//    // load receipt
//    return [[DTReceipt alloc] initWithContentsOfURL: receiptURL];
//}
//
//- (BOOL)_refreshReceiptIsNecessary
//{
//    DTReceipt *receipt = [self _purchaseReceipt];
//    
//    if (!receipt)
//    {
//        DTLogDebug(@"No valid Receipt found");
//        return YES;
//    }
//    
//    // ingredients for validation
//    NSBundle *mainBundle = [NSBundle mainBundle];
//    NSString *bundleIdentifier = mainBundle.bundleIdentifier; // could also be hard-coded
//    NSString *appVersion = mainBundle.infoDictionary[(__bridge NSString *)kCFBundleVersionKey]; // could be hard-coded
//    NSUUID *vendorIdentifier = [[UIDevice currentDevice] identifierForVendor];
//    
//    // for demo: override values so that the receipt validates
//    bundleIdentifier = @"de.emmi-club.manager";
//    appVersion = @"372";
//    vendorIdentifier = [[NSUUID alloc] initWithUUIDString:@"7EB61F70-E56D-46F1-AC3A-84D1B43829D3"];
//    
//    if (![receipt.bundleIdentifier isEqualToString:bundleIdentifier])
//    {
//        DTLogDebug(@"Incorrect bundle identifier in receipt");
//        return YES;
//    }
//    
//    if (![receipt.appVersion isEqualToString:appVersion])
//    {
//        DTLogDebug(@"Incorrect bundle version in receipt");
//        return YES;
//    }
//    
//    /*
//     In iOS, use the value returned by the identifierForVendor property of UIDevice as the computer’s GUID.
//     
//     To compute the hash, first concatenate the GUID value with the opaque value (the attribute of type 4) and the bundle identifier. Use the raw bytes from the receipt without performing any UTF-8 string interpretation or normalization. Then compute the SHA-1 hash of this concatenated series of bytes.
//     */
//    uuid_t uuid;
//    [vendorIdentifier getUUIDBytes:uuid];
//    NSData *vendorData = [NSData dataWithBytes:uuid length:16];
//    
//    // concacentate data for vendor identifier, opaque value and bundle identifier
//    NSMutableData *hashData = [NSMutableData new];
//    [hashData appendData:vendorData];
//    [hashData appendData:receipt.opaqueValue];
//    [hashData appendData:receipt.bundleIdentifierData];
//    
//    // calculate SHA1
//    NSData *hash = [hashData dataWithSHA1Hash];
//    
//    if (![hash isEqualToData:receipt.SHA1Hash])
//    {
//        DTLogDebug(@"Incorrect SHA1 hash in receipt");
//        
//        return YES;
//    }
//    
//    return NO;
//}



@end
