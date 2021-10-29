package keeper

import (
	"github.com/cosmonaut/oracle/x/consuming/types"
)

var _ types.QueryServer = Keeper{}
