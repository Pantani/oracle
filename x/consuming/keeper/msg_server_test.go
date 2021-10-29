package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/cosmonaut/oracle/testutil/keeper"
	"github.com/cosmonaut/oracle/x/consuming/keeper"
	"github.com/cosmonaut/oracle/x/consuming/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.ConsumingKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
