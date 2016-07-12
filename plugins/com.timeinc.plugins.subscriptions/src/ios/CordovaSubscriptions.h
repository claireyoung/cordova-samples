//
//  CordovaLocationNotifications.h
//  Travel+Leisure
//
//  Created by Claire Young on 3/20/16.
//
//

#import <Cordova/CDVPlugin.h>

@interface CordovaSubscriptions : CDVPlugin

-(void)verifyReceipt:(CDVInvokedUrlCommand*)command;

@end
