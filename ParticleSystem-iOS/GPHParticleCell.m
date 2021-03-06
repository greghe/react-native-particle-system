#import "GPHParticleCell.h"
#import <React/RCTAssert.h>
#import <React/RCTImageView.h>

@interface GPHParticleCell ()

@property (nonatomic) UIImageView *observedObject;

@end

@implementation GPHParticleCell

- (id)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  _emitterCell = [CAEmitterCell emitterCell];
  return self;
}

- (void)dealloc
{
  [_observedObject removeObserver:self forKeyPath:@"image"];
  _observedObject = nil;
}

- (void)addSubview:(UIView *)view
{
  NSAssert([view isKindOfClass:[RCTImageView class]],
           @"Only an RCTImageView may be a child of a ParticleCell");
  
  UIImageView *imageView = (UIImageView*) [[view subviews] firstObject];
  
  [imageView addObserver:self forKeyPath:@"image"
                 options:NSKeyValueObservingOptionNew context:nil];
  self.observedObject = imageView;
  
  [self checkForCellImageSetup:imageView];
}

- (void)insertSubview:(UIView *)view atIndex:(NSInteger)index
{
  NSAssert([view isKindOfClass:[RCTImageView class]],
           @"Only an Image may be a child of a ParticleCell");
  
  UIImageView *imageView = (UIImageView*) [[view subviews] firstObject];

  [imageView addObserver:self forKeyPath:@"image"
                 options:NSKeyValueObservingOptionNew context:nil];
  self.observedObject = imageView;
  
  [self checkForCellImageSetup:imageView];
  // don't actually insert the imageview
}

// to avoid a lot of boilerplate code we'll just forward the set property calls
- (void)forwardInvocation:(NSInvocation *)anInvocation
{
  if ([self.emitterCell respondsToSelector:anInvocation.selector]) {
    anInvocation.target = self.emitterCell;
    
    [anInvocation invoke];
  }
}

- (NSMethodSignature*)methodSignatureForSelector:(SEL)aSelector
{
  NSMethodSignature *signature = [self.emitterCell methodSignatureForSelector:aSelector];
  
  NSAssert(signature != nil, @"unknown property set on GPHParticleCell: %@",
           NSStringFromSelector(aSelector));
  return signature;
}

- (void)setLifetime:(float)lifetime
{
  self.emitterCell.lifetime = lifetime/kMillisecondsPerSecond;
}

- (void)setDuration:(double)duration
{
  self.emitterCell.duration = duration/kMillisecondsPerSecond;
}

- (void)setTimeOffset:(double)timeOffset
{
  self.emitterCell.timeOffset = timeOffset/kMillisecondsPerSecond;
}

- (void)setRepeatDuration:(double)repeatDuration
{
  self.emitterCell.repeatDuration = repeatDuration/kMillisecondsPerSecond;
}

-(void)setEmitterSetupCompletion:(void (^)(CAEmitterCell *))emitterSetupCompletion
{
  _emitterSetupCompletion = emitterSetupCompletion;
  
  if (self.emitterCell.contents) {
    // if we already have the image, execute the callbac right away
    emitterSetupCompletion(self.emitterCell);
  }
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary<NSString *,id> *)change
                       context:(void *)context
{
  UIImageView *imageView = (UIImageView*) object;
  [self checkForCellImageSetup:imageView];
}

- (void)checkForCellImageSetup:(UIImageView *)imageView
{
  if (imageView.image) {
    self.emitterCell.contents = (__bridge id) imageView.image.CGImage;
    if (self.emitterSetupCompletion) {
      self.emitterSetupCompletion(self.emitterCell);
    }
    [self.observedObject removeObserver:self forKeyPath:@"image"];
    self.observedObject = nil;
  }
}
@end
